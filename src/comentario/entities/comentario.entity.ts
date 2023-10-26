import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(() => Usuario, usuario => usuario.comentarios)
  @JoinColumn({ name: 'usuario_id' }) // linea de chatgpt
  public usuario: Usuario;

  @Column()
  public comentario: string;

  @Column()
  public id_pelicula: number;

  constructor(usuario: Usuario, comentario: string, id_pelicula: number) {
    this.usuario = usuario;
    this.comentario = comentario;
    this.id_pelicula = id_pelicula;
  }

  public getId(): number {
    return this.id;
  }

  public getUsuario(): Usuario {
    return this.usuario;
  }

  public getComentario(): string {
    return this.comentario;
  }

  public getIdPelicula(): number {
    return this.id_pelicula;
  }

  public setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }

  public setComentario(comentario: string): void {
    this.comentario = comentario;
  }

  public setIdPelicula(id_pelicula: number): void {
    this.id_pelicula = id_pelicula;
  }
}
