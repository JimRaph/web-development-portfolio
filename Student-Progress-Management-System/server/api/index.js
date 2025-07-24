import app from '../index.js'; 
import vercel from '@vercel/node';
const { createServer } = vercel;

export default createServer(app);
