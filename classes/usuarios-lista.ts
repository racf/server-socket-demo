import { Usuario } from './usuario';

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {

    }

    //metodo para agregar un usuario
    public agregar( usuario: Usuario ) {
        this.lista.push ( usuario );
        console.log( usuario );
        return usuario;
    }

    //metodo para actualizar el nombre del usuario
    public actualizarNombre( id: string, nombre: string ) {
        for ( let usuario of this.lista ){
            if( usuario.id === id ){
                usuario.nombre = nombre;
                //break;
                console.log('-----Actualizando usuario --------');
                console.log( this.lista );
                return usuario
            }
        }
        //console.log('-----Actualizando usuario --------');
        //console.log( this.lista );
        return null;
    }

    //obtener la lista de usuarios
    public getLista() {
        return this.lista;
    }

    // Obtener un usuario
    public getUsuario( id: string ) {
        for ( let usuario of this.lista ){
            if( usuario.id === id ){
               return usuario;
            }
        }
        return null;
    }

    // Obtener usuario en una sala en particular
    public getUsuariosEnSala( sala: string ) {

        return this.lista.filter( usuario =>usuario.sala === sala );

    }

    // Borrar Usuario
    public borrarUsuario( id: string ) {

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );
        console.log( this.lista );
        return tempUsuario;
        
    }
}