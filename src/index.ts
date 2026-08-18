import { ChatMistralAI } from "@langchain/mistralai";
import {config} from "dotenv";
import {createInterface} from "node:readline/promises";

config();

const apiKey = process.env.MISTRAL_API_KEY || "";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

rl.prompt();

rl.on('line', async (line: string) => {
    const iterator = await model.stream(line);

    for await (const chunk of iterator) {
        process.stdout.write(chunk.text);   
    }

    rl.prompt();
});
