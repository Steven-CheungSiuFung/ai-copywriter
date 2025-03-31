'use client';

import CopyGenerator from "@/components/copy-generator/copy-generator.component"

export default function CopyGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center bg-white">
            <h1 className="mt-13 mb-9 font-[family-name:var(--font-poppins)] text-4xl font-bold leading-8">Copy Generator</h1>
            <CopyGenerator />
        </div>
    )
}