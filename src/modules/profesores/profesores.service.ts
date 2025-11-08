import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesoresService {
  private readonly profesores: Profesor[] = [];

  create(createProfesorDto: CreateProfesorDto) {
    const exists = this.profesores.find((p) => p.id === createProfesorDto.id);
    if (exists) {
      throw new BadRequestException('Ya existe un profesor con ese ID');
    }
    const newProfesor: Profesor = {
      ...createProfesorDto,
    };
    this.profesores.push(newProfesor);
    return newProfesor;
  }

  findAll() {
    return [...this.profesores];
  }

  findOne(id: number) {
    const profesor = this.profesores.find((p) => p.id === id);
    if (!profesor) {
      throw new NotFoundException('Profesor not found');
    }
    return profesor;
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto): Profesor {
    const profesorIndex = this.profesores.findIndex((p) => p.id === id);
    if (profesorIndex === -1) throw new NotFoundException('Profesor not found');

    this.profesores[profesorIndex] = {
      ...updateProfesorDto,
      id: id,
    };
    return this.profesores[profesorIndex];
  }

  remove(id: number) {
    const profesorIndex = this.profesores.findIndex((a) => a.id === id);
    if (profesorIndex === -1) throw new NotFoundException('Profesor not found');
    this.profesores.splice(profesorIndex, 1);
  }
}
