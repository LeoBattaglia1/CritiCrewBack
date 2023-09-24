import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import {ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';


@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}


  @Post()
  async crearcomentario(@Body() {usuario, comentario, id_pelicula}: CreateComentarioDto) {
    const nuevacomentario = await this.comentarioService.create(usuario, comentario, id_pelicula);
    return nuevacomentario;
  }

  @Get()
  findAll() {
    return this.comentarioService.getAllComentario();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.comentarioService.getComentarioById(id);
  }

  
  @Put(':id')
  async actualizarcomentario(@Param('id') id: number, @Body('usuario') usuario: Usuario, @Body('comentario') comentario: string, @Body('id_pelicula') id_pelicula: number) {
      const comentarioActualizado = await this.comentarioService.update(id, usuario, comentario, id_pelicula);
      return comentarioActualizado;
  }
 

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentarioService.remove(+id);
  }
}
