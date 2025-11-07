import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoDto } from './create-alumno.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {
  @ApiProperty({ type: String, description: 'Nombres del alumno' })
  nombres: string;

  @ApiProperty({ type: String, description: 'Apellidos del alumno' })
  apellidos: string;

  @ApiProperty({ type: String, description: 'Número de matrícula del alumno' })
  matricula: string;

  @ApiProperty({ type: Number, description: 'Promedio del alumno' })
  promedio: number;
}
