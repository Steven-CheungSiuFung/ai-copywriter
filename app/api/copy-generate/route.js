import { ai } from '@/lib/ai';
import { streamText } from 'ai';

export async function POST(req) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: ai.deepseek('deepseek-chat'),
            system: 'You are a professional copywriting assistant',
            messages,
        });

        return result.toDataStreamResponse();

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}