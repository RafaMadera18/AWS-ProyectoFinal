import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnosService {
  private readonly alumnos: Alumno[] = [];
  private idCounter = 1;

  create(createAlumnoDto: CreateAlumnoDto) {
    const newAlumno: Alumno = {
      id: this.idCounter++,
      ...createAlumnoDto,
    };
    this.alumnos.push(newAlumno);
  }

  findAll() {
    return [...this.alumnos];
  }

  findOne(id: number) {
    return this.alumnos.find((alumno) => alumno.id === id);
  }

  update(id: number, updateAlumnoDto: UpdateAlumnoDto): Alumno {
    const alumnoIndex = this.alumnos.findIndex((a) => a.id === id);
    if (alumnoIndex === -1) throw new Error('Alumno not found');
    this.alumnos[alumnoIndex] = {
      ...this.alumnos[alumnoIndex],
      ...updateAlumnoDto,
    };
    return this.alumnos[alumnoIndex];
  }

  remove(id: number) {
    const alumnoIndex = this.alumnos.findIndex((a) => a.id === id);
    if (alumnoIndex === -1) throw new Error('Alumno not found');
    this.alumnos.splice(alumnoIndex, 1);
  }
}
