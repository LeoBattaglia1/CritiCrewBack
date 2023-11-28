import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() usuario: CreateUsuarioDto) {
    const nuevoUsuario = await this.usuarioService.create(usuario);
    return nuevoUsuario;
  }

  @Post('autenticar')
  async autenticarUsuario(
    @Body() body: { correo: string; contraseña: string },
  ) {
    const { correo, contraseña } = body;
    const mensaje = await this.usuarioService.authenticateUsuario(
      correo,
      contraseña,
    );
    return mensaje;
  }

  @Get()
  findAll() {
    return this.usuarioService.getAllUsuarios();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.usuarioService.getUsuarioById(id);
  }

  @Put(':id')
  async actualizarUsuario(
    @Param('id') id: number,
    @Body() usuarioDto: CreateUsuarioDto,
  ) {
    const usuarioActualizado = await this.usuarioService.update(id, usuarioDto);
    return usuarioActualizado;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
