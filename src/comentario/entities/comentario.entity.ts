import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(() => Usuario, usuario_id => usuario_id.comentario)
  public usuario_id: Usuario;

  @Column()
  private comentario: string;

  @Column()
  private id_pelicula: number;

  constructor(usuario_id: Usuario, comentario: string, id_pelicula: number) {
    this.usuario_id = usuario_id;
    this.comentario = comentario;
    this.id_pelicula = id_pelicula;
  }

  public getId(): number {
    return this.id;
  }

  public getUsuario(): Usuario {
    return this.usuario_id;
  }

  public getComentario(): string {
    return this.comentario;
  }

  public getIdPelicula(): number | undefined {
    return this.id_pelicula;
  }

  public setUsuario(usuario_id: Usuario): void {
    this.usuario_id = usuario_id;
  }

  public setComentario(comentario: string): void {
    this.comentario = comentario;
  }

  public setIdPelicula(id_pelicula: number): void {
    this.id_pelicula = id_pelicula;
  }
}
