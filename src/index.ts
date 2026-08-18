import { ChatMistralAI } from "@langchain/mistralai";
import {config} from "dotenv";

config();

const apiKey = process.env.MISTRAL_API_KEY || "";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey
});

const response = await model.invoke("Hello Mistral! how are you?");

console.log(response);
