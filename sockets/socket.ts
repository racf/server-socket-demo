import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

//conectar cliente
export const conectarCliente = ( cliente: Socket ) =>{
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}
//login usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
        //console.log('Configurando usuario', payload.nombre);
        const usuario = usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        console.log('Configurando usuario', usuario);
        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });  
});
}

export const desconectar = ( cliente: Socket ) =>{
    cliente.on('disconnect', () =>{
        
        const usuario  = usuariosConectados.borrarUsuario( cliente.id );
        console.log('Cliente desconectado...!', usuario);
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
