import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

export const router = Router();

router.get('/mensaje', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: "Metodo get...!"
    });
});


router.post('/mensaje', ( req: Request, res: Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    //envíar mensaje a todos los usuarios 
    const server = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload );
    res.json({
        ok: true,
        cuerpo,
        de
    });
});


router.post('/mensaje/:id', ( req: Request, res: Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;  
    const id  = req.params.id;
    
    const payload = {
        de,
        cuerpo
    }
    //para enviar mensaje a un usuario especifico 
    const server = Server.instance;
    server.io.in ( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

//Servicio para obtener todos los Ids de los usuarios
router.get( '/usuarios', ( req: Request, res: Response ) =>{
    const server = Server.instance;

    //obtener todos los clientes conectados
    server.io.clients( ( err: any, clientes: string[] ) => {
        if( err ) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            clientes
        });
    });
});
  
//Servicio para obtener toda la información de los usuarios
router.get( '/usuarios/detalle', ( req: Request, res: Response ) =>{
    usuariosConectados
    res.json({
        ok:true,
        clientes: usuariosConectados.getLista() 
    });
});    