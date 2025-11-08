import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post()
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    const newAlumno = this.alumnosService.create(createAlumnoDto);
    return {
      message: 'Alumno creado exitosamente',
      alumno: newAlumno,
    };
  }

  @Get()
  findAll() {
    return this.alumnosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    const updatedAlumno = this.alumnosService.update(+id, updateAlumnoDto);
    return {
      message: 'Alumno actualizado exitosamente',
      alumno: updatedAlumno,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.alumnosService.remove(+id);
    return {
      message: 'Alumno eliminado exitosamente',
    };
  }
}
