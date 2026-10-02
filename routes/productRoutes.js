const express = require("express");

const productController = require("../controllers/productController");

const {
    cacheMiddleware
} = require("../middleware/cacheMiddleware");

const asyncHandler = require("../middleware/asyncHandler");


const router = express.Router();


// GET /products
router.get(
    "/products",
    cacheMiddleware,
    asyncHandler(productController.getProducts)
);


// GET /products/:id
router.get(
    "/products/:id",
    cacheMiddleware,
    asyncHandler(productController.getProductById)
);


// POST /products
router.post(
    "/products",
    asyncHandler(productController.createProduct)
);


// PUT /products/:id
router.put(
    "/products/:id",
    asyncHandler(productController.updateProduct)
);


// PATCH /products/:id
router.patch(
    "/products/:id",
    asyncHandler(productController.patchProduct)
);


// DELETE /products/:id
router.delete(
    "/products/:id",
    asyncHandler(productController.deleteProduct)
);


module.exports = router;