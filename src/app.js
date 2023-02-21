//IMPORTAMOS MODULO EXPRESS
import express from 'express';
import {ProductManager} from './ProductManager.js';

const productManager = new ProductManager('./Product.json');

//CREAMOS SERVIDOR EXPRESS
const app = express();

//PARA USO DE LAS QUERY
app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res)=> {
    const {limit} = req.query;
    const productList = await productManager.getProducts();
    if (!limit){
        res.send(productList)
    }else{
        const productcListLimit = productList.slice(0,limit)
        res.send(productcListLimit)
    }
})

app.get('/products/:pid', async (req, res)=> {
    const {pid} = req.params;
    const productList = await productManager.getProducts();
    const productFound = productList.find(product => product.id == +pid)
    if (productFound){
        res.send(productFound);
    }
    else{
        res.send({error: `no existe el producto con el id  ${pid}`})
    }
})

//DEFINO EL PUERTO DONDE CORRER, DESDE DONDE ESCUCHA
const port = 8080;

app.listen(port, ()=>{
    console.log(`server http corriendo en el puerto ${port}`)
})

