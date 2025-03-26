import { ai } from '@/lib/ai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
    const { messages } = await req.json();
    
    const result = streamText({
        model: ai.deepseek('deepseek-chat'),
        messages,
    });

    return result.toDataStreamResponse();
}