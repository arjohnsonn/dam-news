// gpt.ts
import { OpenAI } from 'openai';

// Read the API key from your environment variable
const apiKey = process.env.EXPO_PUBLIC_GPT_KEY;
if (!apiKey) {
  throw new Error('EXPO_PUBLIC_GPT_KEY environment variable is not set.');
}

const client = new OpenAI({
  apiKey: apiKey,
});

/**
 * Returns a bulleted list generated by GPT based on the given prompt.
 * @param prompt - A string containing the query/instructions for the GPT model.
 * @param articleText - the full content of the article
 * @returns A promise resolving to a plain-text bulleted list.
 */
export async function getGPTResponse(prompt: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', //cheaper
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 200,
    });

    // ensure response variable content is not null
    if (
      !response.choices ||
      response.choices.length === 0 ||
      !response.choices[0].message?.content
    ) {
      throw new Error('Invalid response from OpenAI');
    }

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching GPT response:', error);
    throw error;
  }
}

//export async function getBulletedList(prompt: string): Promise<string> {
//   const systemMessage =
//     'You are an assistant that only responds with a plain text bulleted list. Each bullet should begin with a dash (-) followed by a space.';

//   try {
//     /* WAITING_FOR_CONVERGENT */

//     // const response = await client.responses.create({
//     //   model: 'gpt-4o',
//     //   input: `${systemMessage} ${prompt}`,
//     // });

//     // // Extract and return the response text
//     // return response.output_text;

//     const bulletListString = `• Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//     • Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// • Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
// • Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
// • Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

//     return bulletListString;
//   } catch (error) {
//     console.error('Error fetching GPT response:', error);
//     throw error;
//   }
// }
