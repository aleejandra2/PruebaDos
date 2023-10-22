export interface Clase {
  profesor: string;
  hora: string;
  sala: string;
  dia: string;
}
export interface Usuario{
    usuario:string;
    nombre:string;
    apellido: string;
    rut: string;
    region:number;
    comuna:number;
    escuela: string;
    carrera: string;
    contrasenia:string;
    latitude: number;
    longitude:number;
    clase: Clase;
}
