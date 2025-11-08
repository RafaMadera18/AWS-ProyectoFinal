import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnosService {
  private readonly alumnos: Alumno[] = [];

  create(createAlumnoDto: CreateAlumnoDto): Alumno {
    const exists = this.alumnos.find((a) => a.id === createAlumnoDto.id);
    if (exists) {
      throw new BadRequestException('Ya existe un alumno con ese ID');
    }

    const newAlumno: Alumno = {
      ...createAlumnoDto,
    };

    this.alumnos.push(newAlumno);
    return newAlumno;
  }

  findAll() {
    return [...this.alumnos];
  }

  findOne(id: number) {
    const alumno = this.alumnos.find((a) => a.id === id);
    if (!alumno) {
      throw new NotFoundException('Alumno not found');
    }
    return alumno;
  }

  update(id: number, updateAlumnoDto: UpdateAlumnoDto): Alumno {
    const alumnoIndex = this.alumnos.findIndex((a) => a.id === id);
    if (alumnoIndex === -1) {
      throw new NotFoundException('Alumno not found');
    }

    this.alumnos[alumnoIndex] = {
      ...updateAlumnoDto,
      id: id,
    };

    return this.alumnos[alumnoIndex];
  }

  remove(id: number) {
    const alumnoIndex = this.alumnos.findIndex((a) => a.id === id);
    if (alumnoIndex === -1) throw new NotFoundException('Alumno not found');
    this.alumnos.splice(alumnoIndex, 1);
  }
}
