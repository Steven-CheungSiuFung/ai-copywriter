import { useState } from 'react';
import { useChat } from 'ai/react';

export default function CopyGenerator() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/copy-generate',
        onFinish() {
            setIsLoading(false);
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCopySubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            setError('Please enter a description');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await handleSubmit(e)
        } catch (err) {
            setError(err.message);
        } finally {

        }
    };

    return (
        <div className="max-w-3xl mx-auto min-w-[720px] p-4 space-y-6">
            <form onSubmit={handleCopySubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
                <div className="mb-5">
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-3 font-[family-name:var(--font-poppins)]">
                        Enter copy keywords:
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[family-name:var(--font-poppins)]"
                        value={input}
                        placeholder="For example: 'Summer ice cream chocolate flavor'"
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center top-[683px] left-[621px] w-[197px] h-[44px] px-2 border-0 box-border rounded-xl text-white text-sm font-[family-name:var(--font-poppins)] leading-5 outline-none hover:bg-[#1a1a1a] ${isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#030303] cursor-pointer'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Generate Copy'}
                </button>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                        ⚠️ {error}
                    </div>
                )}
            </form>

            {messages.map(m => (
                <div key={m.id}>{m.content}</div>
            ))}

        </div>
    );
}