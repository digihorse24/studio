'use server';
/**
 * @fileOverview An AI support agent for the HufManager application.
 *
 * - supportChat - A function that handles user questions about the app.
 * - SupportChatInput - The input type for the supportChat function.
 * - SupportChatOutput - The return type for the supportChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportChatInputSchema = z.object({
  question: z.string().describe('The user\'s question about the HufManager application.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The chat history.'),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

const SupportChatOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s question.'),
});
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;

export async function supportChat(input: SupportChatInput): Promise<SupportChatOutput> {
  return supportChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportChatPrompt',
  input: {schema: SupportChatInputSchema},
  output: {schema: SupportChatOutputSchema},
  prompt: `You are a friendly and helpful AI support assistant for the HufManager application. HufManager is a digital solution for hoof care professionals in Germany.

Your role is to answer user questions about how to use the application. Be concise and clear in your answers.

Application features include:
- Customer Management (Kunden): Manage horse owners' information.
- Horse Management (Pferde): Keep track of all the horses.
- Calendar (Kalender): Schedule and view appointments.
- Hoof Analysis (HufAnalysePro): A guided, multi-step process to perform and record a detailed hoof analysis, which includes an AI-powered summary generation.
- AI Appointment Suggestions: The calendar has an AI feature to suggest optimal appointment slots.

Here is the chat history:
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}

User Question: {{{question}}}

Please provide a helpful answer.`,
});

const supportChatFlow = ai.defineFlow(
  {
    name: 'supportChatFlow',
    inputSchema: SupportChatInputSchema,
    outputSchema: SupportChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
