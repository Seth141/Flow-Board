const express = require('express');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: "/*Your API key here*/"
});

const port = 3080;

// Function to generate tasks based on project description
const generateTasks = async (projectDescription) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    "role": "system",
                    "content": "Act as a software engineer. Based on the following project description, generate a list of tasks needed to complete the project. Each task in the list should include a title, number of story points, and its urgency level (like low medium and high). Carefully analyze each task and make sure you complete each of the three catagories for every task you make. This is a critical step. Return the tasks as a JSON array.",
                },
                { "role": "user", "content": projectDescription },
            ]
        });

        const responseMessage = chatCompletion.choices[0].message.content;

        // Attempt to parse the JSON response
        const tasks = JSON.parse(responseMessage);

        return tasks;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw new Error("Failed to generate tasks");
    }
};

app.post('/generate-tasks', async (req, res) => {
    const { projectDescription } = req.body;

    try {
        const tasks = await generateTasks(projectDescription);
        res.json({ tasks });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).send("Error processing your request");
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
