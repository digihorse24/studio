'use server';
/**
 * @fileOverview A hoof analysis summary AI agent.
 *
 * - generateHoofAnalysisSummary - A function that handles the hoof analysis summary generation process.
 * - GenerateHoofAnalysisSummaryInput - The input type for the generateHoofAnalysisSummary function.
 * - GenerateHoofAnalysisSummaryOutput - The return type for the generateHoofAnalysisSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHoofAnalysisSummaryInputSchema = z.object({
  analysisData: z.string().describe('The data from the hoof analysis.'),
});
export type GenerateHoofAnalysisSummaryInput = z.infer<typeof GenerateHoofAnalysisSummaryInputSchema>;

const GenerateHoofAnalysisSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the hoof analysis.'),
  recommendations: z.string().describe('Recommendations based on the hoof analysis.'),
});
export type GenerateHoofAnalysisSummaryOutput = z.infer<typeof GenerateHoofAnalysisSummaryOutputSchema>;

export async function generateHoofAnalysisSummary(input: GenerateHoofAnalysisSummaryInput): Promise<GenerateHoofAnalysisSummaryOutput> {
  return generateHoofAnalysisSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHoofAnalysisSummaryPrompt',
  input: {schema: GenerateHoofAnalysisSummaryInputSchema},
  output: {schema: GenerateHoofAnalysisSummaryOutputSchema},
  prompt: `You are an expert in hoof care and analysis. Based on the provided hoof analysis data, generate a summary and provide recommendations for the hoof care professional to share with the horse owner.\n\nHoof Analysis Data: {{{analysisData}}}`,
});

const generateHoofAnalysisSummaryFlow = ai.defineFlow(
  {
    name: 'generateHoofAnalysisSummaryFlow',
    inputSchema: GenerateHoofAnalysisSummaryInputSchema,
    outputSchema: GenerateHoofAnalysisSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
