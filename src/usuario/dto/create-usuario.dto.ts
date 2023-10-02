export class CreateUsuarioDto {
    readonly nombre : string;
    readonly correo : string;
    readonly contraseña : string;
    readonly genero : Array<number>;
}