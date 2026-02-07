'use client'

import { useState } from 'react'
import { getWhatsAppShareUrl } from '@/lib/utils'

interface ShareButtonsProps {
    url: string
    partnerName: string
}

export default function ShareButtons({ url, partnerName }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const shareOnWhatsApp = () => {
        const whatsappUrl = getWhatsAppShareUrl(url, partnerName)
        window.open(whatsappUrl, '_blank')
    }

    return (
        <div className="space-y-3">
            {/* Copy Link Button */}
            <button
                onClick={copyToClipboard}
                className="w-full px-6 py-4 bg-white border-2 border-pink-300 rounded-2xl font-semibold text-pink-600 hover:bg-pink-50 transition-all flex items-center justify-center gap-2 group"
            >
                {copied ? (
                    <>
                        <span className="text-2xl">✓</span>
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <span className="text-2xl">📋</span>
                        <span>Copy Link</span>
                    </>
                )}
            </button>

            {/* WhatsApp Share Button */}
            <button
                onClick={shareOnWhatsApp}
                className="w-full px-6 py-4 bg-green-500 rounded-2xl font-semibold text-white hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
                <span className="text-2xl">💬</span>
                <span>Share on WhatsApp</span>
            </button>
        </div>
    )
}
