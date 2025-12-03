import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlumnoDto: CreateAlumnoDto) {
    const newAlumno = await this.alumnosService.create(createAlumnoDto);
    return {
      id: newAlumno.id,
      message: 'Alumno creado exitosamente',
      alumno: newAlumno,
    };
  }

  @Get()
  async findAll() {
    return await this.alumnosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.alumnosService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlumnoDto: UpdateAlumnoDto,
  ) {
    const updatedAlumno = await this.alumnosService.update(
      +id,
      updateAlumnoDto,
    );
    return {
      message: 'Alumno actualizado exitosamente',
      alumno: updatedAlumno,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.alumnosService.remove(+id);
    return {
      message: 'Alumno eliminado exitosamente',
    };
  }

  @Post(':id/fotoPerfil')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('foto'))
  async uploadProfilePhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    const photoUrl = await this.alumnosService.uploadProfilePhoto(+id, file);
    return {
      message: 'Foto de perfil subida exitosamente',
      fotoPerfilUrl: photoUrl,
    };
  }

  @Post(':id/email')
  @HttpCode(HttpStatus.OK)
  async sendEmail(@Param('id') id: string) {
    await this.alumnosService.sendEmailNotification(+id);
    return {
      message: 'Correo enviado exitosamente',
    };
  }

  @Post(':id/session/login')
  @HttpCode(HttpStatus.OK)
  async login(@Param('id') id: string, @Body() body: { password: string }) {
    return await this.alumnosService.login(+id, body.password);
  }

  @Post(':id/session/verify')
  @HttpCode(HttpStatus.OK)
  async verifySession(
    @Param('id') id: string,
    @Body() body: { sessionString: string },
  ) {
    const isValid = await this.alumnosService.verifySession(
      +id,
      body.sessionString,
    );

    if (isValid) {
      return {
        message: 'Sesión válida',
        valid: true,
      };
    } else {
      throw new BadRequestException('Sesión inválida');
    }
  }

  @Post(':id/session/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Param('id') id: string,
    @Body() body: { sessionString: string },
  ) {
    await this.alumnosService.logout(+id, body.sessionString);
    return {
      message: 'Logout exitoso',
    };
  }
}
