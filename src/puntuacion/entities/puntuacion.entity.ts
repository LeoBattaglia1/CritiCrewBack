import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity('puntuacion')
export class Puntuacion {
  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(() => Usuario, usuario_id => usuario_id.puntuacion)
  public usuario_id: Usuario;

  @Column()
  private puntuacion: number;

  @Column()
  private id_pelicula: number;

  constructor(usuario_id: Usuario, puntuacion: number, id_pelicula: number) {
    this.usuario_id = usuario_id;
    this.puntuacion = puntuacion;
    this.id_pelicula = id_pelicula;
  }

  public getId(): number {
    return this.id;
  }

  public getUsuario(): Usuario {
    return this.usuario_id;
  }

  public getPuntuacion(): number {
    return this.puntuacion;
  }

  public getIdPelicula(): number | undefined {
    return this.id_pelicula;
  }

  public setIdPelicula(id_pelicula: number): void {
    this.id_pelicula = id_pelicula;
  }

  public setUsuario(usuario_id: Usuario): void {
    this.usuario_id = usuario_id;
  }
  
  public setPuntuacion(puntuacion: number): void {
    this.puntuacion = puntuacion;
  }
}

/////////////////////////////////////////////