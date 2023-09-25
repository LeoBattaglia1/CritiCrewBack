import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import {ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';



@Controller('comentario')
export class ComentarioController {
  constructor(private readonly ComentarioService: ComentarioService) {}


  @Post()
  async crearComentario(@Body() createComentarioDto: CreateComentarioDto) {
    const nuevaComentario = await this.ComentarioService.create(createComentarioDto);
    return nuevaComentario;
  }

  /* @Get()
  findAll() {
    return this.comentarioService.getAllComentario();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.comentarioService.getComentarioById(id);
  } */

  
 /*  @Put(':id')
  async actualizarcomentario(@Param('id') id: number, @Body('usuario') usuario: Usuario, @Body('comentario') comentario: string, @Body('id_pelicula') id_pelicula: number) {
      const comentarioActualizado = await this.comentarioService.update(id, usuario, comentario, id_pelicula);
      return comentarioActualizado;
  }
 

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentarioService.remove(+id);
  }
   */
}
