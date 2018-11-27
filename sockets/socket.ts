import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

//conectar cliente
export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) =>{
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );    
}
//login usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
        //console.log('Configurando usuario', payload.nombre);
        const usuario = usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        console.log('Configurando usuario', usuario);
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );
        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });  
    });
}

export const desconectar = ( cliente: Socket,  io: socketIO.Server ) =>{
    cliente.on('disconnect', () =>{
        
        const usuario  = usuariosConectados.borrarUsuario( cliente.id );
        console.log('Cliente desconectado...!', usuario);
        //al desconectarse un usario emitimos la lista al cliente...
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );
    });
}

//Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', payload);
        
        //Reenvia el mensaje a los clientes conectados
        io.emit('mensaje-nuevo', payload );
    });
}

//Obtener usuarios
export const obtenerUsuarios = ( cliente: Socket,  io: socketIO.Server ) => {
    cliente.on('obtener-usuarios', () =>{
        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() );
    });    
}
