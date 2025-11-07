import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesoresService {
  private readonly profesores: Profesor[] = [];
  private idCounter = 1;

  create(createProfesorDto: CreateProfesorDto) {
    const newProfesor: Profesor = {
      id: this.idCounter++,
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
    return Profesor;
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto): Profesor {
    const profesorIndex = this.profesores.findIndex((p) => p.id === id);
    if (profesorIndex === -1) throw new NotFoundException('Profesor not found');
    this.profesores[profesorIndex] = {
      ...this.profesores[profesorIndex],
      ...updateProfesorDto,
    };
    return this.profesores[profesorIndex];
  }

  remove(id: number) {
    const profesorIndex = this.profesores.findIndex((a) => a.id === id);
    if (profesorIndex === -1) throw new NotFoundException('Profesor not found');
    this.profesores.splice(profesorIndex, 1);
  }
}
