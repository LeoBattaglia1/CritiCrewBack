import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  readonly nombre: string;

  @IsNotEmpty()
  @IsEmail()
  readonly correo: string;

  readonly contraseña: string;
  readonly genero: Array<number>;
}
