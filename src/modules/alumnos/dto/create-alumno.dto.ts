import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'ID del alumno' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Nombres del alumno' })
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Apellidos del alumno' })
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^A\d+$/, {
    message: 'La matrícula debe empezar con A seguido de números',
  })
  @ApiProperty({ type: String, description: 'Número de matrícula del alumno' })
  matricula: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ type: Number, description: 'Promedio del alumno' })
  promedio: number;
}
