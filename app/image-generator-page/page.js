'use client';

import ImageGenerator from "@/components/image-generator/image-generator.component"

export default function ImageGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center bg-white">
            <h1 className="mt-13 mb-9 font-[family-name:var(--font-poppins)] text-4xl font-bold leading-8">Image Generator</h1>
            <ImageGenerator />
        </div>
    )
}