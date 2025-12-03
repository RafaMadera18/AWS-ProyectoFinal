import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Nombres del alumno',
    required: false,
  })
  nombres?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Apellidos del alumno',
    required: false,
  })
  apellidos?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(/^A\d+$/, {
    message: 'La matrícula debe empezar con A seguido de números',
  })
  @ApiProperty({
    type: String,
    description: 'Número de matrícula del alumno',
    required: false,
  })
  matricula?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional() // Agregar este decorador
  @ApiProperty({
    type: Number,
    description: 'Promedio del alumno',
    required: false,
  })
  promedio?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Password del alumno',
    required: false,
  })
  password?: string;
}
