
export class Usuario {   
    public id: string;  //identificador del socket
    public nombre: string; //nombre del usuario
    public sala: string; //sala al que se le enviara el mensaje

    constructor( id: string) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}