//IMPORTAMOS MODULO EXPRESS
import express from 'express';
import cookieParser from 'cookie-parser';
import productsRoute from './routes/products.route.js';
import cartsRoute from './routes/carts.route.js';
import fileDirName from './utils/fileDirName.js';
import { uploader } from './utils/uploader.js';
import handlebars from 'express-handlebars';

const { __dirname } = fileDirName(import.meta);
//CREAMOS SERVIDOR EXPRESS
const app = express();

//PARA USO DE LAS QUERY
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())

//CONFIGURAMOS HANDLEBARS

//UTILIZAMOS ARCHIVOS ESTATICOS DESDE LA CARPETA PUBLIC
app.use(express.static(__dirname + '/public'));

//APLICAMOS ROUTE 
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);

/*
PRUEBA DE ERROR DE MIDDELWARE
app.get('/test', (res,req) => {
    throw new Error('Error');
});
*/

//MULTER PARA CARGAR ARCHIVOS AL SERVIDOR
app.post("/file",uploader.single('file'), (req, res)=>{
    res.send(req.file, req.body);
})


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
