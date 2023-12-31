import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() { nombre, correo, contraseña }: CreateUsuarioDto) {
    const nuevoUsuario = await this.usuarioService.create(nombre, correo, contraseña);
    return nuevoUsuario;
  }
  

  @Get()
  findAll() {
    return this.usuarioService.getAllUsuarios();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.getUsuarioById(id);
  }

  @Put(':id')
  async actualizarUsuario(@Param('id') id: number, @Body('nombre') nombre: string, @Body('correo') correo: string, @Body('contraseña') contraseña: string) {
      const usuarioActualizado = await this.usuarioService.update(id, nombre, correo, contraseña);
      return usuarioActualizado;
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id') id: number) {
    await this.usuarioService.delete(id);
    return { mensaje: 'Usuario eliminado correctamente' };
  }
}

