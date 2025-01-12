import mongoose from "mongoose";


const orderItemSchema = mongoose.Schema({
    name: {type: String, required: true},
    qty: {type: Number, required: true},
    price: {type: Number, required: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    image: {type: String, required: true}
})



const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true}
    },
    paymentMethod: {
        type: String, required: true, default: "Paypal"
    },
    paymentResult:{
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String}
    },
    shippingPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number, 
        required: true
    },
    isPaid: {
        type: Boolean, 
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered:{
        type: Boolean, 
        default: false,
        required: true
    },
    debugger: {
        type: Date,
    },
}, {timestamps: true})

export default mongoose.model('Orders', orderSchema)