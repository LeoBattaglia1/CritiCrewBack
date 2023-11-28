import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { PuntuacionController } from './puntuacion.controller';
import { Puntuacion } from './entities/puntuacion.entity';
import { PuntuacionService } from './puntuacion.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Puntuacion, Usuario]), UsuarioModule],
  controllers: [PuntuacionController],
  providers: [PuntuacionService],
})
export class PuntuacionModule {}
