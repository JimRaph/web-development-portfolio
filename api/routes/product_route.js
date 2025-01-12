import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import productSchema from '../models/product_model.js';

const productRouter = express.Router();

// Fetch all products from the database
productRouter.get('/', expressAsyncHandler(async (req, res) => {
     const products = await productSchema.find({});
     res.status(200).json(products);
}))


// Fetch a single product by id from the database
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
     const product = await productSchema.findById(req.params.id);
     if (product) {
         res.status(200).json(product);
     } else {
         res.status(404).json({ message: 'Product not found' });
     }
}))

//post product to db
productRouter.post('/', expressAsyncHandler(async (req, res) => {
    try{
        const {name, image, description, price, countInStock, rating, numReview} = req.body
    
        const product = new productSchema({
            name, image, 
            description, price, 
            countInStock, rating, numReview
        })
    
        const productCreated = await product.save()
        res.status(201).json(productCreated)
    }catch(err){
        res.status(500).send('error creating product')
    }
   
}));

export default productRouter