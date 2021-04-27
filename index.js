const express = require("express");

const app = express();

const bodyParser = require('body-parser');

const { getConnection } = require('./connection/mongoose.connection');

const { router } = require('./routes/product.route');
const { specRouter } = require("./routes/specifications.route");

const PORT = 7000

getConnection();
app.use(bodyParser.json());
app.use('/products', router);
app.use('/specs', specRouter);

app.get("/", (req, res) => {
    res.status(201).json({ success: true, message: "I'm root Path" });
})

/**
 * ENDPOINTS
 * GET || POST: /products/:productid (post only creates one product)
 * POST: /specifications/:productid  (create specfication)
 * GET /products/  get all products
 * 
 */

/**
 * 404 ROUTE: DO NOT REMOVE, SHOULD BE AT THE END
 */
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "no such endpoint" });
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
})