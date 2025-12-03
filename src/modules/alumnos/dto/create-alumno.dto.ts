import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateAlumnoDto {
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

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Password del alumno',
    required: false,
  })
  password?: string;
}
