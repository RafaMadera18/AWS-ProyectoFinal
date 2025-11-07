import { ApiProperty } from '@nestjs/swagger';

export class CreateAlumnoDto {
  @ApiProperty({ type: String, description: 'Nombres del alumno' })
  nombres: string;

  @ApiProperty({ type: String, description: 'Apellidos del alumno' })
  apellidos: string;

  @ApiProperty({ type: String, description: 'Número de matrícula del alumno' })
  matricula: string;

  @ApiProperty({ type: Number, description: 'Promedio del alumno' })
  promedio: number;
}
