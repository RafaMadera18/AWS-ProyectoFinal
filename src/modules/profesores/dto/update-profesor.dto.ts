import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDto } from './create-profesor.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) {
  @ApiProperty({
    type: Number,
    description: 'Número de empleado del profesor',
  })
  numeroEmpleado: number;

  @ApiProperty({
    type: String,
    description: 'Nombres del profesor',
  })
  nombres: string;

  @ApiProperty({
    type: String,
    description: 'Apellidos del profesor',
  })
  apellidos: string;

  @ApiProperty({
    type: Number,
    description: 'Número de horas de clase del profesor',
  })
  horasClase: number;
}
