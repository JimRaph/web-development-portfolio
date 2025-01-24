import express from 'express';
import authenticate from '../middleware/authenticator.js';
import expressAsyncHandler from 'express-async-handler';
import orderSchema from '../models/order_model.js';

const orderRouter = express.Router();

orderRouter.post('/', authenticate, expressAsyncHandler(async (req, res) => {
    const {orderItems, price, totalPrice, taxPrice, shippingPrice,
        paymentMethods, shippingAddress
} = req.body;

console.log('from order post router ', orderItems)

if(orderItems && orderItems.length ===0){
    res.status(400);
    throw new Error("No order items");
}
else{
    const order = new orderSchema({
        orderItems, price, totalPrice, taxPrice, shippingPrice,
        paymentMethods, shippingAddress, user: req.user.id
    })

    const orderCreated = await order.save();
    res.status(200).json(orderCreated);
}
}))


orderRouter.get('/:id', authenticate, expressAsyncHandler(async (req,res) => {
    const order = await orderSchema.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error("Order not found");
    }
}))


orderRouter.put('/:id/payment', authenticate, expressAsyncHandler(async (req, res) => {
    const order = await orderSchema.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.create_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
    else{
        res.status(404);
        throw new Error("Order not found");
    }
}))

orderRouter.get('/', authenticate, expressAsyncHandler(async (req, res) => {
    const allOrder = await orderSchema.find({user: req.user.id}).sort({id: 1});
    if(allOrder){
        res.status(200).json(allOrder);
    }
    else{
        res.status(404);
        throw new Error("No orders found");
    }
}))



export default orderRouter;