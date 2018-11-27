import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from "socket.io";
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server{
    private static _instance: Server;
    public app: express.Application;
    public port: number;


    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.escucharSokets();
    }

    //Utilizando el singlenton para que no se generen mas de una conexión
    public static get instance(){
        return this._instance || ( this._instance = new this )
    }


    private escucharSokets(){
        console.log("Escuchado conexiones - sokects");
        this.io.on('connection', cliente =>{
            //mostrando el id del socket del cliente
            console.log('Cliente conectado', cliente.id);

            //Conectar cliente
            socket.conectarCliente( cliente, this.io );
            
            //Configurar usuario
            socket.configurarUsuario( cliente, this.io );
            
            //Obtener usuarios Activos
            socket.obtenerUsuarios( cliente, this.io );

            //Mensajes
            socket.mensaje( cliente, this.io );

            //Desconectar cliente
            socket.desconectar( cliente, this.io );
            
        });

        
    }

    start( callback: Function){
        //this.app.listen( this.port, callback );
        this.httpServer.listen( this.port, callback );
    }
}

