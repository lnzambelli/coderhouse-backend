import { Router } from "express";
import { FileManager } from "../utils/fileManager.js";

const fileManager = new FileManager('./src/data/Cart.json')
const fileManagerProducts = new FileManager('./src/data/Product.json')
const route = Router();

route.post('/', async (req, res) => {
    const id = await fileManager.add({"products": []});
    res.status(201).send({ id });
});

route.get('/:cid', async (req, res)=> {
    const {cid} = req.params;
    const carts = await fileManager.getAll();
    const cartFound = carts.find(cart => cart.id == cid)
    if (!cartFound){
        res.status(404).send({ error: `no existe el carrito con el id  ${cid}`});
        return
    }
    res.send(cartFound.products);
})

route.post('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params;
    
    const carts = await fileManager.getAll();
    const cartFound = carts.find(cart => cart.id == cid);
    if (!cartFound){
        res.status(404).send({ error: `no existe el carrito con el id  ${cid}`});
        return
    }

    const productFound = await fileManagerProducts.get(pid);
    if (!productFound){
        res.status(404).send({ error: `no existe el producto con el id  ${pid}`});
        return
    }

    const productInCart = cartFound.products.filter(product =>product.product == pid)
    const productOutCart = cartFound.products.filter(product =>product.product != pid)
    let quantityUpdate = 1;
    if (productInCart.length > 0){
        const {quantity} = productInCart[0];
        quantityUpdate = quantity +1;
    }

    const newProduct = {"product": pid, "quantity": quantityUpdate}
    const products = { products: [...productOutCart, newProduct]}
    await fileManager.update(cid, products);
    
    res.status(201).send();
});

export default route;