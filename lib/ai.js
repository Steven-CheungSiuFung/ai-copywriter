import { createDeepSeek } from '@ai-sdk/deepseek';

export const ai = {
    deepseek: createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY })
}