import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (createComentarioDto.usuario_id === null) {
      throw new BadRequestException("Primero debes iniciar seccion");
    }
    if (createComentarioDto.comentario){
      const usuario = await this.UsuarioService.getUsuarioById(createComentarioDto.usuario_id);
      const nuevoComentario = new Comentario(usuario, createComentarioDto.comentario, createComentarioDto.id_pelicula);
    return this.ComentarioRepository.save(nuevoComentario);
    }
  }
  

  async getAllComentario(): Promise<Comentario[]> {
    return this.ComentarioRepository.find({
      select: ["comentario", "id_pelicula"]
    });
 
  }

  async getComentarioByIdPelicula(id: number): Promise<Comentario[]> {
    const Comentario = await this.ComentarioRepository.find({ 
      where: { id_pelicula: id }, 
      select: ["comentario"] 
    });
    if (Comentario.length==0) {
      throw new NotFoundException(`Comentario con ID ${id} de pelicula no encontrado`);
    }
    return Comentario;
  }

  
  async update(id: number, Comentario: string): Promise<Comentario> {
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
    throw new NotFoundException(`Comentario con ID ${id} no encontrada`);
  }else{
    await this.ComentarioRepository.remove(Comentario);
    return 'Comentario eliminada correctamente';
  }     
}

}



