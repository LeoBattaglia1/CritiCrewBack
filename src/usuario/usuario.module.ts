import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioController } from './usuario.controller';
import {Usuario } from './entities/usuario.entity';
import {UsuarioService } from './usuario.service';
import { GeneroModule } from 'src/genero/genero.module';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([Usuario ]), 
    GeneroModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}