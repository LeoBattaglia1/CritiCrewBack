import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Puntuacion } from './entities/puntuacion.entity';
import { CreatePuntuacionDto } from './dto/create-puntuacion.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
@Injectable()
export class PuntuacionService {
  constructor(
    @InjectRepository(Puntuacion)
    private readonly PuntuacionRepository: Repository<Puntuacion>,
    private UsuarioService: UsuarioService,
  ) {}



  async create(createPuntuacionDto: CreatePuntuacionDto) {
    const usuario = await this.UsuarioService.getUsuarioById(createPuntuacionDto.idUsuario);
  
    if (!usuario) {
      throw new NotFoundException("El usuario no existe");
    }
  //copiada de chatGPT para que compile
    const nuevoPuntuacion = new Puntuacion(usuario, createPuntuacionDto.puntuacion, createPuntuacionDto.id_pelicula);
  
    return this.PuntuacionRepository.save(nuevoPuntuacion);
  }
  

  async getAllPuntuacion(): Promise<Puntuacion[]> {
    return this.PuntuacionRepository.find();
  }

  async getPuntuacionById(id: number): Promise<Puntuacion> {
    const criterio : FindOneOptions = { where: { id: id } };
    const Puntuacion = await this.PuntuacionRepository.findOne(criterio);
  
    if (!Puntuacion) {
      throw new NotFoundException(`Puntuacion con ID ${id} de usuario no encontrado`);
    }
    return Puntuacion;
  }

 /*  async update(id: number, usuario: Usuario, puntuacion: number, id_pelicula: number): Promise<Puntuacion> {
    const criterio : FindOneOptions = { where: { id: id } };
    const puntuaciones = await this.PuntuacionRepository.findOne(criterio);

    if (!puntuaciones) {
      throw new NotFoundException(`puntuacion con ID ${id} no encontrado`);
    }

    puntuaciones.setUsuario(usuario);
    puntuaciones.setPuntuacion(puntuacion);
    puntuaciones.setIdPelicula(id_pelicula);

    return this.PuntuacionRepository.save(puntuaciones);
}


  remove(id: number) {
    return `This action removes a #${id} puntuacion`;
  } */
}
