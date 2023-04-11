const PORT = 8080
const express = require("express")
const products = require("./routes/products.routes.js")
const cart = require("./routes/cart.routes.js")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/productos", products)
app.use("/api/carrito", cart)

app.listen(PORT, () => console.log("Server Up"))