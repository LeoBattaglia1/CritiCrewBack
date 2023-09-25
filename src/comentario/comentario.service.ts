import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Comentario } from './entities/comentario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

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
  //esta linea de codigo fue copiada de chatGPT para que compile 
    const nuevoComentario = new Comentario(usuario, createComentarioDto.comentario, createComentarioDto.id_pelicula);
  
    return this.ComentarioRepository.save(nuevoComentario);
  }

 

 /*  async getAllComentario(): Promise<Comentario[]> {
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
  } */
}




