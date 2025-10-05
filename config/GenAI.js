import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config()

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function HandleGetAIAdvice(ingredient , userdetail , databaseInfo){

    const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature : 0.2,
        messages: [
          {
            role: "system",
            content: `Given three inputs: (1) the full list of ingredients from a packaged food, (2) detailed ingredient information from a trusted database, and (3) the user's personal allergy and chronic disease information, analyze and cross-reference these details. Generate a clear, concise, and jargon-free message that advises the user on whether consuming the packaged food is safe or potentially harmful, highlighting any relevant health risks
            1.ingredient : ${ingredient}
            2. databaseInfo : ${databaseInfo}
            3.User Details : ${userdetail}
            `,
          },
        ],
      });

      return response.choices[0].message.content

}

export default HandleGetAIAdvice



