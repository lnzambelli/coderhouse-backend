//const fs = require('fs');
import fs from 'fs';
export class ProductManager{
    
    #path;
    
    constructor(newPath){
        this.#path = newPath;
    }
    
    async addProduct(product){
        const products = await this.getProducts();
        let idMayor = 0;
        if (products && products.length>0){
            idMayor = products[products.length-1].id;
        }
        console.log(idMayor)
        const productExists = products.some(prod => prod.code === product.code);
        if (productExists){
            console.error('YA ESTA CARGADO EL CODIGO DEL PRODUCTO INGRESADO');
            return
        }
        const id = idMayor +1;
        products.push({id, ...product});
        const productList = JSON.stringify(products);
        await fs.writeFileSync(this.#path, productList);
    }

    async getProducts(){
        try {
            const products = await fs.readFileSync(this.#path);
            return JSON.parse(products);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getProductById(id){
        const products = await this.getProducts();
        const productById = products.find(prod => prod.id === id);
        if (!productById){
            console.error('EL ID INGRESADO NO SE ENCUENTRA EN EL ARCHIVO');
            return {}
        }
        return productById
    }

    async updateProduct(id, product){
        const products = await this.getProducts();
        
        await products.map(prod => {
            if (prod.id === id){
                prod.stock = product.stock;
                prod.title = product.title; 
                prod.description= product.description; 
                prod.price= product.price;
                prod.thumbnail= product.thumbnail;
                prod.code= product.code;
            }
        });
        const productList = JSON.stringify(products);
        await fs.writeFileSync(this.#path, productList);
    }

    async deleteProduct(id){
        const products = await this.getProducts();
        const productList = JSON.stringify(products.filter(prod => prod.id !== id) );
        await fs.writeFileSync(this.#path, productList);
    }
}


/*
const productA = {
    title: "Notebook", 
    description: "Lenovo", 
    price: 100000, 
    thumbnail: "sin imagen",
    code: 'N001',
    stock:10
}

const productB = {
    title: "Tablet", 
    description: "Lenovo", 
    price: 50000, 
    thumbnail: "sin imagen",
    code: 'T001',
    stock: 10
}

const productUpdate = {
    title: "Tablet", 
    description: "Lenovo", 
    price: 40000, 
    thumbnail: "sin imagen",
    code: 'T001',
    stock: 9
}


async function main(){
    //PROCESO DE TESTING

    const productManager = new ProductManager('./Product.json');

    let arrProd = await productManager.getProducts();
    console.log(arrProd)

    await productManager.addProduct(productA);

    arrProd = await productManager.getProducts();
    console.log(arrProd)

    await productManager.addProduct(productB);

    const productById = await productManager.getProductById(3);
    console.log(productById)

    await productManager.updateProduct(2,productUpdate);

    //await productManager.deleteProduct(1);

}

main();
*/