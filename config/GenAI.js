import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config()

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});


async function HandleGetAIAdvice(ingredient , userdetail , databaseInfo){

  const prompt = `"Using the following inputs:

Full list of ingredients from a packaged food: ${ingredient}

Detailed ingredient information from a trusted database: ${databaseInfo}

User’s personal allergy and chronic disease details: ${userdetail}

Analyze and cross-reference the data to determine if the packaged food is safe for the user to consume. Provide a short, clear, and jargon-free message (4–5 lines) explaining whether the food is safe or potentially harmful, and specify any relevant health risks identified. Do not include recommendations or mention consulting healthcare professionals—focus solely on conveying the main safety assessment."

Explanation:

Clarified task objective: Reframed to specify the analytical and decision-making process clearly.

Structured input listing: Organized inputs for easier parsing and consistent formatting.

Specified output constraints: Reinforced clarity, length, and tone requirements for the message.

Removed directive language: Replaced instructional phrasing with a descriptive outcome to align with prompt-engineering best practices.`


    const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature : 0.2,
        messages: [
          {
            role: "system",
            content: prompt
          },
        ],
      });

      return response.choices[0].message.content

}

export default HandleGetAIAdvice



