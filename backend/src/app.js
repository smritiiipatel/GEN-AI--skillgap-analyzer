import express from 'express';
import { authRouter } from './routes/auth.routes.js';
import { interviewRouter } from './routes/interview.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://gen-ai-skillgap-analyzer-frontend.onrender.com"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // preflight fix

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;