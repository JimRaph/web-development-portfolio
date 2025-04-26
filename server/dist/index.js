import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dashboardRouter from './routes/dashboardRoutes.js';
import productRouter from './routes/productRoutes.js';
import expensesRouter from './routes/expenseRoutes.js';
import userRouter from './routes/userRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000'
}));
const port = process.env.PORT || 3001;
app.use("/dashboard", dashboardRouter);
app.use("/products", productRouter);
app.use("/expenses", expensesRouter);
app.use("/users", userRouter);
app.listen(port, () => {
    console.log("listening to port ", port);
});
