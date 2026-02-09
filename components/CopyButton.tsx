'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy testing:', err)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
        >
            {copied ? (
                <span className="flex items-center gap-1">
                    ✓
                </span>
            ) : (
                <span className="flex items-center gap-1">
                    📋 Copy
                </span>
            )}
        </button>
    )
}
