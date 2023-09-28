export class CreateUsuarioDto {
    readonly id : number;
    readonly nombre : string;
    readonly correo : string;
    readonly contraseña : string;
    readonly genero : Array<Number>;
}