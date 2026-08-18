import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "dotenv";
import { createInterface } from "node:readline/promises";

config();

const apiKey = process.env.MISTRAL_API_KEY || "";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

let context = "";

while (true) {

    const userPrompt = await rl.question("> ");

    context += `
    user: ${userPrompt}
    AI: `;

    const streamIterator = await model.stream(context);

    for await (const chunk of streamIterator) {
        process.stdout.write(chunk.text);
        context += `${chunk.text}`;
    }

    process.stdout.write("\n");
}