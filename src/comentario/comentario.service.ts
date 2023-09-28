import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Comentario } from './entities/comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';


@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly ComentarioRepository: Repository<Comentario>,
    private UsuarioService: UsuarioService,
  ) {}



  async create(createComentarioDto: CreateComentarioDto) {
    const usuario = await this.UsuarioService.getUsuarioById(createComentarioDto.usuario_id);
  
    if (!usuario) {
      throw new NotFoundException("El usuario no existe");
    }

    const nuevoComentario = new Comentario(usuario, createComentarioDto.comentario, createComentarioDto.id_pelicula);
  
    return this.ComentarioRepository.save(nuevoComentario);
  }
  

  async getAllComentario(): Promise<Comentario[]> {
    return this.ComentarioRepository.find({
      relations: ["usuario"]
    });
 
  }

  async getComentarioById(id: number): Promise<Comentario> {
    const criterio : FindOneOptions = { where: { id: id } };
    const Comentario = await this.ComentarioRepository.findOne(criterio);
  
    if (!Comentario) {
      throw new NotFoundException(`Comentario con ID ${id} de usuario no encontrado`);
    }
    return Comentario;
  }

  
  async update(id: number, usuario_id: number, Comentario: string, id_pelicula: number): Promise<Comentario> {
    const criterioUsuario : FindOneOptions = { where: { id: id } };
    const usuario = await this.ComentarioRepository.findOne(criterioUsuario);

    if (!usuario) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    usuario.setComentario(Comentario);
  

    return this.ComentarioRepository.save(usuario);
}



async remove(id: number): Promise<string> {
  const criterio : FindOneOptions = { where: { id: id } };
  const Comentario = await this.ComentarioRepository.findOne(criterio);

  if (!Comentario) {
    throw new NotFoundException(`Puntuación con ID ${id} no encontrada`);
  }else{
    await this.ComentarioRepository.remove(Comentario);
    return 'Comentario eliminada correctamente';
  }     
}

}



