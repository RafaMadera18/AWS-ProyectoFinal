import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const exists = await this.profesorRepository.findOne({
      where: { numeroEmpleado: createProfesorDto.numeroEmpleado },
    });

    if (exists) {
      throw new BadRequestException(
        'Ya existe un profesor con ese número de empleado',
      );
    }

    const newProfesor = this.profesorRepository.create(createProfesorDto);
    return await this.profesorRepository.save(newProfesor);
  }

  async findAll(): Promise<Profesor[]> {
    return await this.profesorRepository.find();
  }

  async findOne(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor) {
      throw new NotFoundException('Profesor not found');
    }
    return profesor;
  }

  async update(
    id: number,
    updateProfesorDto: UpdateProfesorDto,
  ): Promise<Profesor> {
    const profesor = await this.findOne(id);
    Object.assign(profesor, updateProfesorDto);
    return await this.profesorRepository.save(profesor);
  }

  async remove(id: number): Promise<void> {
    const profesor = await this.findOne(id);
    await this.profesorRepository.remove(profesor);
  }
}
