import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProfesorDto: CreateProfesorDto) {
    const newProfesor = await this.profesoresService.create(createProfesorDto);
    return {
      id: newProfesor.id,
      message: 'Profesor creado exitosamente',
      profesor: newProfesor,
    };
  }

  @Get()
  async findAll() {
    return await this.profesoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profesoresService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ) {
    const updatedProfesor = await this.profesoresService.update(
      +id,
      updateProfesorDto,
    );
    return {
      message: 'Profesor actualizado exitosamente',
      profesor: updatedProfesor,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.profesoresService.remove(+id);
    return {
      message: 'Profesor eliminado exitosamente',
    };
  }
}
