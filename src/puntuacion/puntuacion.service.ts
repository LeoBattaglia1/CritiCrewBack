import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const usuario = await this.UsuarioService.getUsuarioById(createPuntuacionDto.usuario_id);
  
    if (!usuario) {
      throw new NotFoundException("El usuario no existe");
    }

    const puntuacion = createPuntuacionDto.puntuacion;
    if (!Number.isInteger(puntuacion) || puntuacion < 0 || puntuacion > 10) {
      throw new BadRequestException("La puntuación debe ser un número entero entre 0 y 10");
    }
    
    const nuevoPuntuacion = new Puntuacion(usuario, createPuntuacionDto.puntuacion, createPuntuacionDto.id_pelicula);
  
    return this.PuntuacionRepository.save(nuevoPuntuacion);
  }
  

  async getAllPuntuacion(): Promise<Puntuacion[]> {
    return this.PuntuacionRepository.find({
      select: ["puntuacion", "id_pelicula"]
    });
 
  }

  async getPuntuacionByIdPelicula(id: number): Promise<Puntuacion[]> {
    const Puntuacion = await this.PuntuacionRepository.find({ 
      where: { id_pelicula: id }, 
      select: ["puntuacion"] 
    });
    if (Puntuacion.length==0) {
      throw new NotFoundException(`Puntuacion con ID ${id} de pelicula no encontrado`);
    }
    
    return Puntuacion;
  }

  
  async update(id: number, puntuacion: number): Promise<Puntuacion> {
    const criterioUsuario : FindOneOptions = { where: { id: id } };
    const usuario = await this.PuntuacionRepository.findOne(criterioUsuario);

    if (!usuario) {
      throw new NotFoundException(`Puntuacion con ID ${id} no encontrado`);
    }

    if (!Number.isInteger(puntuacion) || puntuacion < 0 || puntuacion > 10) {
      throw new BadRequestException("La puntuación debe ser un número entero entre 0 y 10");
    }

    usuario.setPuntuacion(puntuacion);
    return this.PuntuacionRepository.save(usuario);
}



async remove(id: number): Promise<string> {
  const criterio : FindOneOptions = { where: { id: id } };
  const puntuacion = await this.PuntuacionRepository.findOne(criterio);

  if (!puntuacion) {
    throw new NotFoundException(`Puntuación con ID ${id} no encontrada`);
  }else{
    await this.PuntuacionRepository.remove(puntuacion);
    return 'Puntuacion eliminada correctamente';
  }     
}

}



