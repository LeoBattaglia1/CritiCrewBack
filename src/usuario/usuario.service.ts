import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}


  async create(nombre: string, correo: string, contraseña: string): Promise<Usuario> {
    const nuevoUsuario = new Usuario(nombre, correo, contraseña);
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

  async delete(id: number): Promise<string> {
    const criterio : FindOneOptions = { where: { id: id } };
    const usuario = await this.usuarioRepository.findOne(criterio);

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    await this.usuarioRepository.remove(usuario);
    return 'Usuario eliminado correctamente';
  }

}
