import { config } from 'dotenv';
config();

import '@/ai/flows/voice-based-assistant.ts';
import '@/ai/flows/predict-irrigation-needs.ts';
import '@/ai/flows/estimate-crop-yield.ts';
import '@/ai/flows/ndvi-analysis-intervention.ts';
import '@/ai/flows/pest-outbreak-forecast.ts';