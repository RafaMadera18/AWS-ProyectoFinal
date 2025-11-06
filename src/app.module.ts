import { Module } from '@nestjs/common';
import { AlumnosModule } from './modules/alumnos/alumnos.module';
import { ProfesoresModule } from './modules/profesores/profesores.module';

@Module({
  imports: [AlumnosModule, ProfesoresModule],
})
export class AppModule {}
