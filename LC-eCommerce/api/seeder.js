import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import productSchema from './models/product_model.js';
import products from './data/products.js'
const seedProductRouter = express.Router();


seedProductRouter.get('/products', expressAsyncHandler(async (req, res) => {
    await productSchema.deleteMany({});
    const productSeeded = await productSchema.insertMany(products)
    res.send({productSeeded})
}))


export default seedProductRouter;