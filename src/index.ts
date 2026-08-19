import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, SystemMessage, BaseMessage } from "langchain";
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

const messages: BaseMessage[] = [
    new SystemMessage(`Your name is shreya! and you are my girlfriend. Today's date: ${new Date()}`)
];

while (true) {    
    const userPrompt = await rl.question("> ");

    messages.push(new HumanMessage(userPrompt));

    const streamIterator = await model.stream(messages);

    let aiResponse = "";
    for await (const chunk of streamIterator) {
        process.stdout.write(chunk.text);
        aiResponse += `${chunk.text}`;
    }

    messages.push(new AIMessage(aiResponse));

    process.stdout.write("\n");
}