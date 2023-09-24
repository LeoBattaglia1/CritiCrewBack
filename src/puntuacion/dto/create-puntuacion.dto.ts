import { Usuario } from "../../usuario/entities/usuario.entity";

export class CreatePuntuacionDto {
    readonly id: number;
    readonly usuario : Usuario;
    readonly puntuacion : number;
    readonly id_pelicula : number;
}
