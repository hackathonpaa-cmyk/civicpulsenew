import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, ".env")
});

console.log(
    "API key:",
    process.env.GEMINI_API_KEY ? "FOUND" : "NOT FOUND"
);

const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());

app.use(express.static(__dirname));

app.get("/", function(req, res) {

    res.sendFile(
        path.join(__dirname, "dashboard.html")
    );

});

app.post("/ask", async function(req, res) {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                answer: "Please enter a message."
            });
        }

        console.log("User:", message);

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: message
        });

        console.log("AI worked");

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.log("AI ERROR:");
        console.log(error.message);

        res.status(500).json({
            answer: error.message
        });

    }

});


app.post("/summarize", async function(req, res) {

    try {

        const notes = req.body.notes;
        const type = req.body.type;

        if (!notes) {

            return res.status(400).json({
                answer: "Please enter some notes."
            });

        }

        console.log("Summarizing notes...");

        let instruction = "";

        if (type === "Detailed") {

            instruction =
                "Give a detailed but easy-to-understand summary.";

        } else if (type === "Exam") {

            instruction =
                "Make an exam-focused summary with important definitions, concepts, formulas, and likely important points.";

        } else {

            instruction =
                "Give a short and simple summary with the most important points.";

        }

        const prompt = `
You are StudyAI, a student study assistant.

${instruction}

Organize the answer clearly.

Use:
- Main idea
- Key points
- Important definitions or formulas if present
- Exam focus

Notes:

${notes}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt
        });

        console.log("Summary worked");

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.log("SUMMARY ERROR:");
        console.log(error.message);

        res.status(500).json({
            answer: error.message
        });

    }

});


app.listen(3000, function() {

    console.log(
        "StudyAI running at http://localhost:3000"
    );

});