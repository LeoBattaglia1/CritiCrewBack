import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity('puntuacion')
export class Puntuacion {
  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(() => Usuario, usuario => usuario.puntuacion)
  @JoinColumn({ name: 'usuario_id' }) 
  public usuario: Usuario;
  
  @Column()
  public usuario_id: number;
  

  @Column()
  public puntuacion: number;

  @Column()
  public id_pelicula: number;

  constructor(usuario: Usuario, puntuacion: number, id_pelicula: number) {
    this.usuario = usuario;
    this.puntuacion = puntuacion;
    this.id_pelicula = id_pelicula;
  }

  public getId(): number {
    return this.id;
  }

  public getUsuario(): Usuario {
    return this.usuario;
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

  public setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }
  
  public setPuntuacion(puntuacion: number): void {
    this.puntuacion = puntuacion;
  }
}

/////////////////////////////////////////////