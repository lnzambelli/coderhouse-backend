import fs from 'fs';
import { randomUUID } from 'crypto';

export class ProductManager{
    
    #path;
    
    constructor(newPath){
        this.#path = newPath;
    }
    
    async addProduct(product){
        const products = await this.getProducts();
        const productExists = products.some(prod => prod.code === product.code);
        if (productExists){
            console.error('YA ESTA CARGADO EL CODIGO DEL PRODUCTO INGRESADO');
            return
        }
        const id = randomUUID();
        products.push({id, ...product});
        const productList = JSON.stringify(products);
        await fs.writeFileSync(this.#path, productList);
        return id;
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
        const productFound = await this.getProductById(id);
        if (!productFound){
            console.error('EL ID INGRESADO NO SE ENCUENTRA EN EL ARCHIVO');
            return
        }
        const products = await this.getProducts();
        const productUpdate = Object.assign({},productFound, product)
        const productsListFilter = products.filter(prod => prod.id !== id);
        const productsListUpdate =  [...productsListFilter, productUpdate]
        const productList = JSON.stringify(productsListUpdate);
        await fs.writeFileSync(this.#path, productList);
    }

    async deleteProduct(id){
        const products = await this.getProducts();
        const productList = JSON.stringify(products.filter(prod => prod.id !== id) );
        await fs.writeFileSync(this.#path, productList);
    }
    
}
