const productDatabase = require("../database/productDatabase");


async function getProducts() {

    return productDatabase.getAllProducts();

}


async function getProductById(id) {

    return productDatabase.getProductById(id);

}


async function createProduct(product) {

    return productDatabase.createProduct(product);

}


async function updateProduct(id, data) {

    return productDatabase.updateProduct(
        id,
        data
    );

}


async function patchProduct(id, data) {

    return productDatabase.patchProduct(
        id,
        data
    );

}


async function deleteProduct(id) {

    return productDatabase.deleteProduct(id);

}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};