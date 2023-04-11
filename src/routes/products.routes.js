const express = require("express");
const classProduct = require("../classes/productsClass.js");
const ProductsClass = new classProduct();
const router = express.Router();

const admin = true;

router.get("/", async (req, res) => {
    const products = await ProductsClass.getAll()
    res.send({status:"succes", payload: products})
});

router.get("/:id", (req, res) => {
    const product = ProductsClass.find(req.params.id);
    product.then((data) => res.status(200).json(data));
});

router.post("/", (req, res) => {
    const product = ProductsClass.create(req.body);
    if (admin) {
        product.then((data) => res.status(200).json(data));
    } else {
        res.send({ error: -1, description: "Ruta no Autorizada" });
    }
});

router.put("/:id", (req, res) => {
    const updateProducts = ProductsClass.update(Number(req.params.id), req.body);
    if (admin) {
        updateProducts.then((data) => res.status(200).json(data));
    } else {
        res.send({ error: -1, description: "Ruta no Autorizada" });
    }
});

router.delete("/:id", (req, res) => {
    const updateProducts = ProductsClass.delete(Number(req.params.id));
    if (admin) {
        updateProducts.then((data) => res.status(200).json(data));
    } else {
        res.send({ error: -1, description: "Ruta no Autorizada" });
    }
});
module.exports = router;
