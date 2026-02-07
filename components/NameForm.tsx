'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NameForm() {
    const [partnerName, setPartnerName] = useState('')
    const [coupleImage, setCoupleImage] = useState<string>('')
    const [imagePreview, setImagePreview] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file')
            return
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            setError('Image must be less than 2MB')
            return
        }

        // Convert to base64
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result as string
            setCoupleImage(base64String)
            setImagePreview(base64String)
            setError('')
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!coupleImage) {
            setError('Please upload a couple photo')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    partnerName,
                    coupleImage
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create valentine')
            }

            // Redirect to success page
            router.push(`/success/${data.id}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
            {/* Partner Name Input */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Partner's Name</label>
                <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Enter her name (e.g., Priya)"
                    className="w-full px-6 py-4 text-lg text-gray-800 placeholder-gray-400 border-2 border-pink-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all bg-white shadow-sm"
                    maxLength={30}
                    required
                    disabled={loading}
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Upload a photo of you two 📸
                </label>

                {imagePreview ? (
                    <div className="relative group">
                        <Image
                            src={imagePreview}
                            alt="Couple preview"
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover rounded-2xl border-2 border-pink-300 shadow-md"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setCoupleImage('')
                                setImagePreview('')
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 shadow-lg transform transition-transform hover:scale-110"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <label className="block w-full px-6 py-8 border-2 border-dashed border-pink-300 rounded-2xl text-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all bg-white group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={loading}
                        />
                        <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">💑</span>
                        <span className="text-gray-600 font-medium">Click to upload photo</span>
                        <span className="block text-sm text-gray-400 mt-1">JPG, PNG (Max 2MB)</span>
                    </label>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm text-center border border-red-100">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !partnerName.trim() || !coupleImage}
                className="w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                    </span>
                ) : (
                    'Create Valentine 💕'
                )}
            </button>

            <p className="text-center text-sm text-gray-500">
                It takes just 10 seconds. No signup needed.
            </p>
        </form>
    )
}
