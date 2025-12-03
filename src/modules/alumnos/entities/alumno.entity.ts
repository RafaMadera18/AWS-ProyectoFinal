import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alumnos')
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  matricula: string;

  @Column('decimal', { precision: 5, scale: 2 })
  promedio: number;

  @Column({ nullable: true })
  fotoPerfilUrl: string;

  @Column({ nullable: true })
  password: string;
}
