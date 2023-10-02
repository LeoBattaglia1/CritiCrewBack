import { Injectable } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Genero } from './entities/genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In } from 'typeorm';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly GeneroRepository: Repository<Genero>,
    
) {}
  create(createGeneroDto: CreateGeneroDto) {
    return 'This action adds a new genero';
  }

  findAll() {
    return `This action returns all genero`;
  }

  async findOne(id: number) {
    const criterio : FindOneOptions = { where: { id: id } };
    const Comentario = await this.GeneroRepository.findOne(criterio);
    return Comentario
  }

  async findDyId(id: Array<number>) {
    const criterio : FindManyOptions = { where: { id: In(id) } };
    const Comentario = await this.GeneroRepository.find(criterio);
    return Comentario
  }


  remove(id: number) {
    return `This action removes a #${id} genero`;
  }
}
