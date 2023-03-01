import { Router } from "express";
import { FileManager } from "../utils/fileManager.js";
import { validateProduct } from "../data/validations.js";

const fileManager = new FileManager('./src/data/Product.json')
const route = Router();

route.get('/', async (req, res)=> {
  const {limit} = req.query;
  const productList = await fileManager.getAll();
  if (!limit){
      res.send(productList)
  }else{
      const productcListLimit = productList.slice(0,limit)
      res.send(productcListLimit)
  }
})

route.get('/:pid', async (req, res)=> {
  const {pid} = req.params;
  const productList = await fileManager.getAll();
  const productFound = productList.find(product => product.id == +pid)
  if (productFound){
      res.send(productFound);
  }
  else{
      res.status(404).send({ error: `no existe el producto con el id  ${pid}`});
  }
})

route.post('/', async (req, res) => {
  const product = req.body;
  const isValid = validateProduct(product);
  if (!isValid) {
    res.status(400).send({
      error: 'Faltan datos obigatorios o estan incorrectos',
    });
    return;
  }
  product["status"] = true;
  if (!product.thumbnails){
    product["thumbnail"] = [];
  }
  try {
    const id = await fileManager.add(product);
    res.status(201).send({ id });
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

route.put('/:pid', async (req, res) => {
  const idProduct = req.params.pid;
  const product = await fileManager.get(idProduct);
  if (!product) {
    res.status(404).send({ error: `Producto ${idProduct} no encontrado` });
    return;
  }
  const productUpdate = req.body;
  await fileManager.update(idProduct, productUpdate);
  res.status(201).send({ ok: true });
});

route.delete('/:pid', async (req, res) => {
  const idProduct= req.params.pid;
  const product = await fileManager.get(idProduct);
  if (!product) {
    res.status(404).send({ error: `Producto ${idProduct} no encontrado` });
    return;
  }
  await fileManager.delete(idProduct);
  res.send({ ok: true });
});


export default route;