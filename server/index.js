import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRotuer from "./routes/user.routes.js";
import materialRouter from "./routes/material.routes.js";
import doubtRouter from "./routes/Doubt.routes.js";
import commentRouter from "./routes/comment.routes.js";
import activityRouter from "./routes/activity.routes.js";
import participantRouter from "./routes/participant.routes.js";
import mailRouter from "./routes/mail.routes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(
  cors({ credentials: true, origin: "https://studymates-server.onrender.com" })
);
app.use(express.json());
dotenv.config();

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => console.log(error));
app.use("/api", mailRouter);
app.use("/api/auth", authRouter);
app.use("/api", userRotuer);
app.use("/api/material", materialRouter);
app.use("/api/doubt", doubtRouter);
app.use("/api/comment", commentRouter);
app.use("/api/activity", activityRouter);
app.use("/api/participant", participantRouter);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// API Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are an AI assistant representing Adani University. Answer politely and helpfully.",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(message);
    const textResponse = result.response.text();
    res.status(200).json({ response: textResponse });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";

  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});
