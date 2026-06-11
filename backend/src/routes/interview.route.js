import express from 'express';
import { authUser } from '../middleware/auth.middleware.js';
import { generateInterviewResponse, getInterviewReortById, getAllReport } from '../controllers/interview.contorller.js';
import upload from '../middleware/file.middleware.js';

const interviewRouter = express.Router();


interviewRouter.post("/",authUser,upload.single("resume"),generateInterviewResponse);

interviewRouter.get("/report/:interviewId",authUser,upload.single("resume"),getInterviewReortById);

interviewRouter.get("/",authUser,getAllReport);

export {interviewRouter};
