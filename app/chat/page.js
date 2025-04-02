'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { MarkdownRenderer } from '@/components/markdown-renderer/markdown-renderer.component';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    onFinish() {
      setIsLoading(false);
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onEnterSubmit = async (e) => {
    if (e.key === "Enter" && e.shiftKey == false) {
      await handleChatSubmit(e)
    }
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter something');
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
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch items-center">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap bg-[#fcfcfc] min-w-[720px] my-3 px-5 py-5 rounded-xl shadow-md">
          {message.role === 'user' ? 'User: ' : ''}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}><MarkdownRenderer content={part.text} /></div>;
            }
          })}
        </div>
      ))}

      {isLoading &&
        <div className='flex flex-row min-w-[720px] px-5 py-3'>
          <svg width={16} height={16} viewBox={`0 0 38 38`} xmlns="http://www.w3.org/2000/svg" stroke={"black"} aria-label="Loading spinner">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2"><circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" /></path>
              </g>
            </g>
          </svg>
        </div>}

      <form className="fixed bottom-9 min-w-[720px] space-y-4 bg-white p-6 rounded-xl shadow-md">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[family-name:var(--font-poppins)]"
          rows={3}
          placeholder="Say something..."
          disabled={isLoading}
          onKeyDown={onEnterSubmit}
        />
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            ⚠️ {error}
          </div>
        )}
      </form>
    </div>
  );
}