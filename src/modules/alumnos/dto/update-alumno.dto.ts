import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateAlumnoDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'ID del alumno', required: false })
  id?: number;

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
