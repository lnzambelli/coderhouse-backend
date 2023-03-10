import { Server } from 'socket.io';
import { socketServer } from '../app';

export default function configureSocket(){
    //CONFIGURAMOS SERVER DEL LADO DEL SERVIDOR

    //ESCUCHAMOS EVENTOS
    socketServer.on("connection", socket=>{
        console.log('Socket conectado')
        socket.on('nombre_mensaje', (data)=>{
            console.log(data)
        })

        socket.emit('lista', 'listado de productos')
    })
}