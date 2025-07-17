import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DbConnect from './db/connectDB.js';


import userRouter from './routes/user_route.js';
import productsRouter from './routes/product_route.js';
import orderRouter from './routes/order_route.js';
import seedProductRouter from './seeder.js'

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://lc-e-commerce-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))


dotenv.config();

// const PORT = 3000 || process.env.PORT

app.use("/api/seed", seedProductRouter)
app.use("/api/user", userRouter)
app.use("/api/products", productsRouter)
app.use("/api/orders", orderRouter)
app.use("/api/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT)
})

console.log("CONNECTION: ", process.env.MONGO_URL)
const run = async() => {
    try {
        await DbConnect(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


run();


export default app;

// Connect DB once when the module is loaded
// let dbConnected = false;

// const connectDB = async () => {
//   if (!dbConnected) {
//     await DbConnect(process.env.MONGO_URL);
//     dbConnected = true;
//   }
// };

// const handler = async (req, res) => {
//   await connectDB();
//   return app(req, res); 
// };

// export default handler;