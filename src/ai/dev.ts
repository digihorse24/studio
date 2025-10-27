'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-hoof-analysis-summary.ts';
import '@/ai/flows/suggest-appointments.ts';
import '@/ai/flows/support-chat-flow.ts';
