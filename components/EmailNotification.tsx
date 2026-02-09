'use client'

import { useState } from 'react'

interface EmailNotificationProps {
    valentineId: string
    partnerName: string
}

export default function EmailNotification({ valentineId, partnerName }: EmailNotificationProps) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        try {
            const response = await fetch('/api/notification/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    valentineId,
                    email: email.trim().toLowerCase()
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to subscribe')
            }

            setStatus('success')
            setMessage(`✅ Perfect! We'll email you at ${email} when ${partnerName} opens your valentine!`)
            setEmail('')
        } catch (err) {
            setStatus('error')
            setMessage(err instanceof Error ? err.message : 'Something went wrong')
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-green-50 rounded-xl p-3 animate-fade-in text-center">
                <p className="text-green-700 text-sm font-medium">
                    ✅ You'll be notified when {partnerName} opens it!
                </p>
            </div>
        )
    }

    return (
        <div className="animate-fade-in pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3 justify-center">
                <span className="text-lg">📬</span>
                <p className="text-gray-700 text-sm font-medium">
                    Get notified when she opens it? <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-4 pr-24 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-200 transition-all"
                        required
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || !email.trim()}
                        className="absolute right-1 top-1 bottom-1 px-4 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {status === 'loading' ? 'Saving...' : 'Notify Me'}
                    </button>
                </div>

                {message && status === 'error' && (
                    <p className="text-red-500 text-xs text-center">
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}
