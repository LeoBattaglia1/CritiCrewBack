import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { ComentarioController } from './comentario.controller';
import { Comentario } from './entities/comentario.entity';
import { ComentarioService } from './comentario.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Comentario, Usuario ])
  ],
  controllers: [ComentarioController],
  providers: [ComentarioService],
})
export class ComentarioModule {}