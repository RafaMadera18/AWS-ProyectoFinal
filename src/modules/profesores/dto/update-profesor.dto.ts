import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDto } from './create-profesor.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'ID del Profesor',
    required: false,
  })
  id?: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'Número de empleado del profesor',
  })
  numeroEmpleado: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Nombres del profesor',
  })
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Apellidos del profesor',
  })
  apellidos: string;

  @IsNumber()
  @IsPositive()
  @Max(50)
  @ApiProperty({
    type: Number,
    description: 'Número de horas de clase del profesor',
  })
  horasClase: number;
}
