const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/ask", async function(req, res) {

    try {

        const message = req.body.message;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key":Ab8RN6J-eE9pVE0awPmR80tGCC2CsyNZtw7Usm5Ks1K_OzQYfQ
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {

            res.status(response.status).json({
                answer: data.error.message
            });

            return;
        }

        const answer =
            data.candidates[0].content.parts[0].text;

        res.json({
            answer: answer
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            answer: "Could not connect to Gemini."
        });

    }

});

app.listen(3000, function() {

    console.log("StudyAI running at http://localhost:3000");

});