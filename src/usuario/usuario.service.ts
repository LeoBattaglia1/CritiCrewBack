import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { GeneroService } from 'src/genero/genero.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private generoService: GeneroService,
  ) {}

  async create(newUsuario: CreateUsuarioDto): Promise<Usuario> {
    if (!newUsuario.nombre || !newUsuario.correo || !newUsuario.contraseña) {
      throw new BadRequestException('Todos los campos son requeridos.');
    }

    const existeNombre = await this.usuarioRepository.findOne({
      where: { nombre: newUsuario.nombre },
    });
    const existeCorreo = await this.usuarioRepository.findOne({
      where: { correo: newUsuario.correo },
    });

    if (existeNombre) {
      throw new BadRequestException(
        `El nombre "${newUsuario.nombre}" ya está en uso.`,
      );
    }

    if (existeCorreo) {
      throw new BadRequestException(
        `El correo "${newUsuario.correo}" ya está en uso.`,
      );
    }

    const nuevoUsuario = new Usuario(
      newUsuario.nombre,
      newUsuario.correo,
      newUsuario.contraseña,
    );
    const generos = await this.generoService.findDyId(newUsuario.genero);

    nuevoUsuario.generos = generos;
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async getAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['generos', 'puntuacion', 'comentarios'],
    });
  }

  async getUsuarioById(id: number): Promise<Usuario> {
    const criterio: FindOneOptions = {
      where: { id: id },
      relations: ['generos', 'puntuacion', 'comentarios'],
    };
    const usuario = await this.usuarioRepository.findOne(criterio);

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async authenticateUsuario(
    correo: string,
    contraseña: string,
  ): Promise<number> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo } });

    if (!usuario) {
      throw new NotFoundException(`Usuario con correo ${correo} no encontrado`);
    }

    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseña,
    );

    if (!contraseñaValida) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    return usuario.id;
  }

  async update(id: number, usuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const criterio: FindOneOptions = { where: { id: id } };
    const usuario = await this.usuarioRepository.findOne(criterio);

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const { nombre, correo, contraseña } = usuarioDto;

    const existeNombre = await this.usuarioRepository.findOne({
      where: { nombre: nombre },
    });
    if (existeNombre && existeNombre.id !== id) {
      throw new BadRequestException(`El nombre "${nombre}" ya está en uso.`);
    }

    const existeCorreo = await this.usuarioRepository.findOne({
      where: { correo: correo },
    });
    if (existeCorreo && existeCorreo.id !== id) {
      throw new BadRequestException(`El correo "${correo}" ya está en uso.`);
    }

    usuario.setNombre(nombre);
    usuario.setCorreo(correo);
    usuario.setContraseña(contraseña);

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<string> {
    const criterio: FindOneOptions = { where: { id: id } };
    const usuario = await this.usuarioRepository.findOne(criterio);

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrada`);
    }
    await this.usuarioRepository.remove(usuario);
    return 'Usuario eliminada correctamente';
  }
}
