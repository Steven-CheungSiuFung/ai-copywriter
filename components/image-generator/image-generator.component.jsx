import { useState, useRef } from 'react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const promptRef = useRef(null);

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a description');
      promptRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/image-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt
        }),
      });

      let prediction = await response.json();
      if (response.status !== 201) {
        setError(prediction.detail);
        return;
      }

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await fetch("/api/image-generate/" + prediction.id);
        prediction = await response.json();
        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
        setImageUrl(prediction.output[prediction.output.length - 1]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto min-w-[720px] p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1 font-[family-name:var(--font-poppins)]">
            Image Description *
          </label>
          <textarea
            id="prompt"
            ref={promptRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[family-name:var(--font-poppins)]"
            rows={3}
            placeholder="For example: 'Cyberpunk style city night scene, neon lights illuminate the rainy streets'"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="negative-prompt" className="block text-sm font-medium text-gray-700 mb-1 font-[family-name:var(--font-poppins)]">
            Exclude content (optional)
          </label>
          <input
            id="negative-prompt"
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-[family-name:var(--font-poppins)]"
            placeholder="For example: 'text, watermark, blur'"
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
          ) : 'Generate Image'}
        </button>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            ⚠️ {error}
          </div>
        )}
      </form>

      {imageUrl && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 font-[family-name:var(--font-poppins)]">Generated result</h2>
          <div className="relative group">
            <img
              src={imageUrl}
              alt={`AI generation: ${prompt}`}
              className="w-full h-auto rounded-lg border border-gray-200"
              onError={() => setError('Image loading failed, please try again')}
            />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={imageUrl}
                download={`ai-image-${Date.now()}.png`}
                className="bg-black/70 text-white px-3 py-1 rounded-md text-sm flex items-center font-[family-name:var(--font-poppins)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}