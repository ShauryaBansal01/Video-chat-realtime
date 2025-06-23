import express from 'express';
import "dotenv/config"
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import CookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(CookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})