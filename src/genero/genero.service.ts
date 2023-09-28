import { Injectable } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';

@Injectable()
export class GeneroService {
  create(createGeneroDto: CreateGeneroDto) {
    return 'This action adds a new genero';
  }

  findAll() {
    return `This action returns all genero`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genero`;
  }


  remove(id: number) {
    return `This action removes a #${id} genero`;
  }
}
