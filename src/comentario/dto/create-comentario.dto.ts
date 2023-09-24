import { Usuario } from "../../usuario/entities/usuario.entity";

export class CreateComentarioDto {
    readonly id: number;
    readonly usuario : Usuario;
    readonly comentario : string;
    readonly id_pelicula : number;
}
