import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AlumnosService {
  private readonly s3Client: S3Client;
  private readonly snsClient: SNSClient;
  private readonly dynamoClient: DynamoDBDocumentClient;
  private readonly bucketName = process.env.S3_BUCKET_NAME;
  private readonly snsTopicArn = process.env.SNS_TOPIC_ARN;
  private readonly tableName = 'sesiones-alumnos';

  constructor(
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>,
  ) {
    const awsConfig = {
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        sessionToken: process.env.AWS_SESSION_TOKEN || '',
      },
    };

    this.s3Client = new S3Client(awsConfig);
    this.snsClient = new SNSClient(awsConfig);
    const dynamoDBClient = new DynamoDBClient(awsConfig);
    this.dynamoClient = DynamoDBDocumentClient.from(dynamoDBClient);
  }

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const exists = await this.alumnoRepository.findOne({
      where: { matricula: createAlumnoDto.matricula },
    });

    if (exists) {
      throw new BadRequestException('Ya existe un alumno con esa matrícula');
    }

    let hashedPassword = '';
    if (createAlumnoDto.password) {
      hashedPassword = await bcrypt.hash(createAlumnoDto.password, 10);
    }

    const newAlumno = this.alumnoRepository.create({
      ...createAlumnoDto,
      password: hashedPassword,
    });

    return await this.alumnoRepository.save(newAlumno);
  }

  async findAll(): Promise<Alumno[]> {
    return await this.alumnoRepository.find();
  }

  async findOne(id: number): Promise<Alumno> {
    const alumno = await this.alumnoRepository.findOne({ where: { id } });
    if (!alumno) {
      throw new NotFoundException('Alumno not found');
    }
    return alumno;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    const alumno = await this.findOne(id);

    let hashedPassword = alumno.password;
    if (updateAlumnoDto.password) {
      hashedPassword = await bcrypt.hash(updateAlumnoDto.password, 10);
    }

    Object.assign(alumno, {
      ...updateAlumnoDto,
      password: hashedPassword,
    });

    return await this.alumnoRepository.save(alumno);
  }

  async remove(id: number): Promise<void> {
    const alumno = await this.findOne(id);
    await this.alumnoRepository.remove(alumno);
  }

  async uploadProfilePhoto(
    id: number,
    file: Express.Multer.File,
  ): Promise<string> {
    const alumno = await this.findOne(id);
    const key = `alumnos/${id}/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    await this.s3Client.send(command);

    const photoUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    alumno.fotoPerfilUrl = photoUrl;
    await this.alumnoRepository.save(alumno);

    return photoUrl;
  }

  async sendEmailNotification(id: number): Promise<void> {
    const alumno = await this.findOne(id);

    const message = `
Notificación de Alumno
----------------------
Nombre: ${alumno.nombres} ${alumno.apellidos}
Matrícula: ${alumno.matricula}
Promedio: ${alumno.promedio}
    `;

    const command = new PublishCommand({
      TopicArn: this.snsTopicArn,
      Message: message,
      Subject: `Información de ${alumno.nombres} ${alumno.apellidos}`,
    });

    await this.snsClient.send(command);
  }

  async login(id: number, password: string): Promise<LoginResponse> {
    const alumno = await this.findOne(id);

    if (!alumno.password) {
      throw new BadRequestException(
        'El alumno no tiene contraseña configurada',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, alumno.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const sessionId = uuidv4();
    const sessionString = this.generateRandomString(128);
    const timestamp = Math.floor(Date.now() / 1000);

    const session = {
      id: sessionId,
      fecha: timestamp,
      alumnoId: id,
      active: true,
      sessionString: sessionString,
    };

    const command = new PutCommand({
      TableName: this.tableName,
      Item: session,
    });

    await this.dynamoClient.send(command);

    return {
      message: 'Login exitoso',
      sessionString: sessionString,
    };
  }

  async verifySession(id: number, sessionString: string): Promise<boolean> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        sessionString: sessionString,
      },
    });

    const result = await this.dynamoClient.send(command);

    if (result.Item?.alumnoId !== id || !result.Item.active) {
      return false;
    }

    return true;
  }

  async logout(id: number, sessionString: string): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: {
        sessionString: sessionString,
      },
      UpdateExpression: 'SET active = :active',
      ExpressionAttributeValues: {
        ':active': false,
      },
    });

    await this.dynamoClient.send(command);
  }

  private generateRandomString(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
