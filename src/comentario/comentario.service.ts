import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Comentario } from './entities/comentario.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
  ) {}




  async create(usuario: Usuario, comentario: string, id_pelicula: number): Promise<Comentario> {
    const nuevocomentario = new Comentario(usuario, comentario, id_pelicula);
    return this.comentarioRepository.save(nuevocomentario);
  }

  async getAllComentario(): Promise<Comentario[]> {
    return this.comentarioRepository.find();
  }

  async getComentarioById(id: number): Promise<Comentario> {
    const criterio : FindOneOptions = { where: { id: id } };
    const comentario = await this.comentarioRepository.findOne(criterio);
  
    if (!comentario) {
      throw new NotFoundException(`comentario con ID ${id} de usuario no encontrado`);
    }
    return comentario;
  }

  async update(id: number, usuario: Usuario, comentario: string, id_pelicula: number): Promise<Comentario> {
    const criterio : FindOneOptions = { where: { id: id } };
    const comentarioes = await this.comentarioRepository.findOne(criterio);

    if (!comentarioes) {
      throw new NotFoundException(`comentario con ID ${id} no encontrado`);
    }

    comentarioes.setUsuario(usuario);
    comentarioes.setComentario(comentario);
    comentarioes.setIdPelicula(id_pelicula);

    return this.comentarioRepository.save(comentarioes);
}


  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}




