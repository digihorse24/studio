'use server';
/**
 * @fileOverview AI-powered appointment suggestions.
 *
 * - suggestAppointments - A function that suggests appointments based on the current calendar and user requests.
 * - SuggestAppointmentsInput - The input type for the suggestAppointments function.
 * - SuggestAppointmentsOutput - The return type for the suggestAppointments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAppointmentsInputSchema = z.object({
  calendar: z.string().describe('The current terminkalender data.'),
  request: z.string().describe('A freetext request for appointment suggestions.'),
});
export type SuggestAppointmentsInput = z.infer<typeof SuggestAppointmentsInputSchema>;

const SuggestAppointmentsOutputSchema = z.object({
  suggestions: z.string().describe('Intelligent appointment suggestions in JSON format.'),
});
export type SuggestAppointmentsOutput = z.infer<typeof SuggestAppointmentsOutputSchema>;

export async function suggestAppointments(input: SuggestAppointmentsInput): Promise<SuggestAppointmentsOutput> {
  return suggestAppointmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAppointmentsPrompt',
  input: {schema: SuggestAppointmentsInputSchema},
  output: {schema: SuggestAppointmentsOutputSchema},
  prompt: `You are an AI assistant helping a hoof care professional manage their appointments.\n\nYou will receive the current terminkalender data and a freetext request for appointment suggestions. Your goal is to provide intelligent appointment suggestions in JSON format.\n\nTerminkalender:\n{{calendar}}\n\nRequest:\n{{request}}\n\nPlease provide the appointment suggestions in JSON format. The JSON should be an array of appointment objects, each with the following keys: date, time, client, service.\n\nExample:\n[{
  "date": "2024-08-15",
  "time": "10:00",
  "client": "John Doe",
  "service": "Hoof trimming"
}, {
  "date": "2024-08-16",
  "time": "14:00",
  "client": "Jane Smith",
  "service": "New shoes"
}]`,
});

const suggestAppointmentsFlow = ai.defineFlow(
  {
    name: 'suggestAppointmentsFlow',
    inputSchema: SuggestAppointmentsInputSchema,
    outputSchema: SuggestAppointmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
