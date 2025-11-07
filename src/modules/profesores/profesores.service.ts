import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesoresService {
  create(createProfesorDto: CreateProfesorDto) {
    return 'This action adds a new profesore';
  }

  findAll() {
    return `This action returns all profesores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profesore`;
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return `This action updates a #${id} profesore`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesore`;
  }
}
