import { ai } from '@/lib/ai';
import { streamText } from 'ai';

export async function POST(req) {
    const { messages } = await req.json();

    const result = streamText({
        model: ai.deepseek('deepseek-chat'),
        messages,
    });

    return result.toDataStreamResponse();
}