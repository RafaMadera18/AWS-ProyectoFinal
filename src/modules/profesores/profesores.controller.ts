import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    const newProfesor = this.profesoresService.create(createProfesorDto);
    return {
      message: 'Profesor creado exitosamente',
      profesor: newProfesor,
    };
  }

  @Get()
  findAll() {
    return this.profesoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesoresService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ) {
    const updatedProfesor = this.profesoresService.update(
      +id,
      updateProfesorDto,
    );
    return {
      message: 'Profesor actualizado exitosamente',
      profesor: updatedProfesor,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.profesoresService.remove(+id);
    return {
      message: 'Profesor eliminado exitosamente',
    };
  }
}
