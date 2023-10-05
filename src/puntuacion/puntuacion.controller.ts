import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';
import { CreatePuntuacionDto } from './dto/create-puntuacion.dto';



@Controller('puntuacion')
export class PuntuacionController {
  constructor(private readonly puntuacionService: PuntuacionService) {}

  @Post()
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
    return this.puntuacionService.getPuntuacionByIdPelicula(id);
  }

  
 
  @Put(':id')
  async actualizarUsuario(@Param('id') id: number, @Body('puntuacion') puntuacion: number) {
    const usuarioActualizado = await this.puntuacionService.update(id, puntuacion);
    return usuarioActualizado;
}


 

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.puntuacionService.remove(+id);
  } 
}
