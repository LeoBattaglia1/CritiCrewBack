import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';
import { CreatePuntuacionDto } from './dto/create-puntuacion.dto';


@Controller('puntuacion')
export class PuntuacionController {
  constructor(private readonly puntuacionService: PuntuacionService) {}


  async crearPuntuacion(@Body() createPuntuacionDto: CreatePuntuacionDto) {
    const nuevaPuntuacion = await this.puntuacionService.create(createPuntuacionDto);
    return nuevaPuntuacion;
  }
  

  @Get()
  findAll() {
    return this.puntuacionService.getAllPuntuacion();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.puntuacionService.getPuntuacionById(id);
  }

  
 /*  @Put(':id')
  async actualizarPuntuacion(@Param('id') id: number, @Body('usuario') usuario: Usuario, @Body('puntuacion') puntuacion: number, @Body('id_pelicula') id_pelicula: number) {
      const PuntuacionActualizado = await this.puntuacionService.update(id, usuario, puntuacion, id_pelicula);
      return PuntuacionActualizado;
  }
 

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntuacionService.remove(+id);
  } */
}
