import { Router } from "express";
import { FileManager } from "../utils/fileManager.js";
import { socketServer } from "../app.js";


const fileManager = new FileManager('./src/data/Product.json')
const route = Router();

route.get('/', async (req, res)=> {
    const productList = await fileManager.getAll();
    res.render('home', {products: productList})
})

route.get('/realtimeproducts', async (req, res)=> {
    const productList = await fileManager.getAll();
    
    socketServer.on("connection", socket=>{
        console.log('Socket conectado')
        socket.on('nombre_mensaje', (data)=>{
            console.log(data)
        })

        socket.emit('lista', productList)

        socket.on('deleteProduct', async (prodID)=>{
            await fileManager.delete(prodID);
            const productList = await fileManager.getAll();
            socket.emit('lista', productList)
        })

        socket.on('addProduct', async (product)=>{
            await fileManager.add(product);
            const productList = await fileManager.getAll();
            socket.emit('lista', productList)
        })
        
    })
    res.render('realTimeProducts', {products: productList})
})

export default route;