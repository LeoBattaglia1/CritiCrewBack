import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateDecoratorOptions } from '@nestjs/core';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { GeneroService } from 'src/genero/genero.service';
import { Genero } from 'src/genero/entities/genero.entity';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private generoService: GeneroService,
  ) {}


  async create(newUsuario : CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = new Usuario(newUsuario.nombre, newUsuario.correo, newUsuario.contraseña);
    const generos  = await this.generoService.findDyId(newUsuario.genero)
   
    nuevoUsuario.generos = generos;
    console.log(generos);
    return this.usuarioRepository.save(nuevoUsuario);

  }

  async getAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async getUsuarioById(id: number): Promise<Usuario> {
    const criterio : FindOneOptions = { where: { id: id } };
    const usuario = await this.usuarioRepository.findOne(criterio);
  
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: number, nombre: string, correo: string, contraseña: string): Promise<Usuario> {
    const criterio : FindOneOptions = { where: { id: id } };
    const usuario = await this.usuarioRepository.findOne(criterio);

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    usuario.setNombre(nombre);
    usuario.setCorreo(correo);
    usuario.setContraseña(contraseña);

    return this.usuarioRepository.save(usuario);
}

async remove(id: number): Promise<string> {
  const criterio : FindOneOptions = { where: { id: id } };
  const usuario = await this.usuarioRepository.findOne(criterio);

  if (!usuario) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrada`);
  }
    await this.usuarioRepository.remove(usuario);
    return 'Usuario eliminada correctamente';
  }     
}

