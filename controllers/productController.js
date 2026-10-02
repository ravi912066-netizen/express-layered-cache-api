const productService = require("../services/productService");

const {
    invalidateCache
} = require("../middleware/cacheMiddleware");


// GET /products
async function getProducts(req, res) {

    const products = await productService.getProducts();

    res.json(products);
}


// GET /products/:id
async function getProductById(req, res) {

    const id = Number(req.params.id);

    const product = await productService.getProductById(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
}


// POST /products
async function createProduct(req, res) {

    const product = await productService.createProduct(req.body);

    // Database successfully changed → clear cache
    invalidateCache();

    res.status(201).json(product);
}


// PUT /products/:id
async function updateProduct(req, res) {

    const id = Number(req.params.id);

    const product = await productService.updateProduct(
        id,
        req.body
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    // Database successfully changed → clear cache
    invalidateCache();

    res.json(product);
}


// PATCH /products/:id
async function patchProduct(req, res) {

    const id = Number(req.params.id);

    const product = await productService.patchProduct(
        id,
        req.body
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    // Database successfully changed → clear cache
    invalidateCache();

    res.json(product);
}


// DELETE /products/:id
async function deleteProduct(req, res) {

    const id = Number(req.params.id);

    const product = await productService.deleteProduct(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    // Database successfully changed → clear cache
    invalidateCache();

    res.json({
        message: "Product deleted successfully",
        product
    });
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};