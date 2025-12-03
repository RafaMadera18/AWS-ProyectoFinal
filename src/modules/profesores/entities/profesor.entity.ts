import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numeroEmpleado: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  horasClase: number;
}
