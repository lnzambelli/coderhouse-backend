import { Router } from "express";
import { FileManager } from "../utils/fileManager.js";

const fileManager = new FileManager('./src/data/Product.json')
const route = Router();

route.get('/', async (req, res)=> {
    const productList = await fileManager.getAll();
    res.render('home', {products: productList})
})

route.get('/realtimeproducts', async (req, res)=> {
    res.render('realTimeProducts', {titulo: 'Aplicamos Socket.io'})
})

export default route;