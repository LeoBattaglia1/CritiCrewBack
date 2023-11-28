import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ComentarioModule } from './comentario/comentario.module';
import { GeneroModule } from './genero/genero.module';
import { PuntuacionModule } from './puntuacion/puntuacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Criticrew10',
      database: 'criticrew',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsuarioModule,
    PuntuacionModule,
    ComentarioModule,
    GeneroModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
