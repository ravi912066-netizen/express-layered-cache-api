const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "db.json");


// Read products from database
async function readProducts() {

    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
}


// Get all products
async function getAllProducts() {

    return readProducts();
}


// Get product by ID
async function getProductById(id) {

    const products = await readProducts();

    return products.find(product => product.id === id);
}


// Write products to database
async function writeProducts(products) {

    const data = JSON.stringify(products, null, 2);

    await fs.writeFile(filePath, data);
}


// Create product
async function createProduct(product) {

    const products = await readProducts();

    const newId =
        products.length === 0
            ? 1
            : Math.max(
                ...products.map(product => product.id)
            ) + 1;

    const newProduct = {
        id: newId,
        ...product
    };

    products.push(newProduct);

    await writeProducts(products);

    return newProduct;
}


// PUT — replace complete product
async function updateProduct(id, data) {

    const products = await readProducts();

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        id,
        ...data
    };

    await writeProducts(products);

    return products[index];
}


// Helper for PATCH
function assign(target, source) {

    for (const key in source) {
        target[key] = source[key];
    }

    return target;
}


// PATCH — update only provided fields
async function patchProduct(id, data) {

    const products = await readProducts();

    const product = products.find(
        product => product.id === id
    );

    if (!product) {
        return null;
    }

    assign(product, data);

    await writeProducts(products);

    return product;
}


// DELETE — remove product
async function deleteProduct(id) {

    const products = await readProducts();

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeProducts(products);

    return deletedProduct;
}


module.exports = {
    getAllProducts,
    getProductById,
    writeProducts,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};