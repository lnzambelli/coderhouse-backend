//IMPORTAMOS MODULO EXPRESS
import express from 'express';
import cookieParser from 'cookie-parser';
import productsRoute from './routes/products.route.js';
import cartsRoute from './routes/carts.route.js';

//CREAMOS SERVIDOR EXPRESS
const app = express();

//PARA USO DE LAS QUERY
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

//APLICAMOS ROUTE 
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);

//DEFINO EL PUERTO DONDE CORRER, DESDE DONDE ESCUCHA
const port = 8080;

//MIDDELWARE DE ERROR
app.use((error, req, res,next)=>{
    console.error(error);
    res.status(500).send({error: "error del servidor no controlado"});
})

app.listen(port, ()=>{
    console.log(`server http corriendo en el puerto ${port}`)
})
