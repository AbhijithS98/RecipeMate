import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js'
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//connect to database
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use('/api',userRoutes);
app.use(errorHandler);

app.get('/',(req,res)=>{
  res.send('server ready')
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
