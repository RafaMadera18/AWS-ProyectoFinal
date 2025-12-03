import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AlumnosModule } from './modules/alumnos/alumnos.module';
import { ProfesoresModule } from './modules/profesores/profesores.module';
import { Alumno } from './modules/alumnos/entities/alumno.entity';
import { Profesor } from './modules/profesores/entities/profesor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number.parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'aws_project',
      entities: [Alumno, Profesor],
      synchronize: true, // Solo para desarrollo
    }),
    AlumnosModule,
    ProfesoresModule,
  ],
})
export class AppModule {}
