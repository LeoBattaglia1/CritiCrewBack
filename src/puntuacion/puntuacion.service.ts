import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (createPuntuacionDto.usuario_id === null) {
      throw new BadRequestException('Primero debes iniciar seccion');
    }
    const usuario = await this.UsuarioService.getUsuarioById(
      createPuntuacionDto.usuario_id,
    );

    const puntuacionExistente = await this.PuntuacionRepository.findOne({
      where: {
        usuario_id: createPuntuacionDto.usuario_id,
        id_pelicula: createPuntuacionDto.id_pelicula,
      },
    });
    if (puntuacionExistente) {
      throw new BadRequestException('Ya has puntuado esta película');
    }

    const nuevoPuntuacion = new Puntuacion(
      usuario,
      createPuntuacionDto.puntuacion,
      createPuntuacionDto.id_pelicula,
    );

    return this.PuntuacionRepository.save(nuevoPuntuacion);
  }

  async getAllPuntuacion(): Promise<Puntuacion[]> {
    return this.PuntuacionRepository.find({
      select: ['puntuacion', 'id_pelicula'],
    });
  }

  async getPromedioByIdPelicula(id: number): Promise<number> {
    const queryResult = await this.PuntuacionRepository.query(
      `SELECT CalcularPuntuacionPromedio(${id}) as promedio`,
    );
    return queryResult[0].promedio;
  }

  async update(id: number, puntuacion: number): Promise<Puntuacion> {
    const criterioUsuario: FindOneOptions = { where: { id: id } };
    const usuario = await this.PuntuacionRepository.findOne(criterioUsuario);

    if (!usuario) {
      throw new NotFoundException(`Puntuacion con ID ${id} no encontrado`);
    }

    usuario.setPuntuacion(puntuacion);
    return this.PuntuacionRepository.save(usuario);
  }

  async remove(id: number): Promise<string> {
    const criterio: FindOneOptions = { where: { id: id } };
    const puntuacion = await this.PuntuacionRepository.findOne(criterio);

    if (!puntuacion) {
      throw new NotFoundException(`Puntuación con ID ${id} no encontrada`);
    } else {
      await this.PuntuacionRepository.remove(puntuacion);
      return 'Puntuacion eliminada correctamente';
    }
  }
}
