const fs = require("fs");
const classCart = require("./cartClass.js");
const CartClass = new classCart();
module.exports = class Products {
    _UBICATION = "./data/products.json";

    async create(product) {
        try {
            if (
                product.title &&
                product.description &&
                product.code &&
                product.price &&
                product.status &&
                product.stock &&
                product.category &&
                product.thumbnails &&
                !product.id
            ) {
                const products = await fs.promises.readFile(this._UBICATION, "utf-8");
                let productsClean = JSON.parse(products);
                product = {
                    id: productsClean.length + 1,
                    ...product,
                };
                productsClean.push(product);
                await fs.promises.writeFile(
                    this._UBICATION,
                    JSON.stringify(productsClean, null, 2)
                );
                return {
                    message: "Producto agregado con exito",
                    product: product,
                };
                } else {
                return {
                    error: 0,
                    description: "El producto ingresado no es correcto",
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, updateProduct) {
        try {
            const products = await fs.promises.readFile(this._UBICATION, "utf-8");
            let productsClean = JSON.parse(products);
            if (
                updateProduct.title &&
                updateProduct.description &&
                updateProduct.code &&
                updateProduct.price &&
                updateProduct.status &&
                updateProduct.stock &&
                updateProduct.category &&
                updateProduct.thumbnails &&
                !updateProduct.id
            ) {
                const updateProducts = productsClean.map((product) => {
            if (product.id === id) {
                updateProduct = {
                id: product.id,
                ...updateProduct,
            };
            return updateProduct;
            } else {
                return product;
            }
            });
            await fs.promises.writeFile(
                this._UBICATION,
                JSON.stringify(updateProducts, null, 2)
            );
            return {
                message: "Producto actualizado con exito",
                products: updateProduct,
            };
        } else {
            return { error: 0, description: "Producto no encontrado" };
        }
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        const products = await fs.promises.readFile(this._UBICATION, "utf-8");
        let productsClean = JSON.parse(products);
        const findProduct = productsClean.find((product) => product.id === id);
            if (findProduct) {
                const updateProducts = productsClean.filter(
                    (product) => product.id != id
                );
                await fs.promises.writeFile(
                    this._UBICATION,
                    JSON.stringify(updateProducts, null, 2)
                );
                return {
                    message: "Producto eliminado con exito",
                    id: id,
                    products: updateProducts,
                };
            } else {
                return { error: 0, description: "Producto no encontrado" };
            }
    }
    async find(id) {
        const products = await fs.promises.readFile(this._UBICATION, "utf-8");
        let productsClean = JSON.parse(products);
        const findProduct = productsClean.find((product) => product.id == id);
            if (findProduct) {
                return { message: "Producto encontrado con exito", product: findProduct };
            } else {
                return { error: 0, description: "Producto no encontrado" };
            }
    }

    async insertProductInCart(idCart, idProduct) {
        const products = await fs.promises.readFile(this._UBICATION, "utf-8");
        let productsClean = JSON.parse(products);
        const product = productsClean.find((product) => product.id == idProduct.id);

        const result = CartClass.insertProduct(idCart, product);
        return result;
    }

    async getAll() {
        try {
            const products = await fs.promises.readFile(this._UBICATION, "utf-8");
            const productsClean = JSON.parse(products);
            return productsClean;
        } catch (error) {
            console.log(error);
        }
    }
};