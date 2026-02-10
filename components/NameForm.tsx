'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { generateValentineId } from '@/lib/utils'
import { sanitizePartnerName, validateBase64Image } from '@/lib/security'

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
            // Validate partner name
            const nameValidation = sanitizePartnerName(partnerName)
            if (!nameValidation.valid) {
                throw new Error(nameValidation.error || 'Invalid name')
            }

            // Validate image
            const imageValidation = validateBase64Image(coupleImage)
            if (!imageValidation.valid) {
                throw new Error(imageValidation.error || 'Invalid image')
            }

            // Generate ID
            const id = generateValentineId()

            // Insert into Supabase directly
            const { error: insertError } = await supabase
                .from('valentines')
                .insert([
                    {
                        id,
                        partner_name: nameValidation.sanitized,
                        couple_image: coupleImage,
                        view_count: 0
                    }
                ])

            if (insertError) {
                throw insertError
            }

            // Redirect to success page with query param
            router.push(`/success?id=${id}`)
        } catch (err) {
            console.error('Error creating valentine:', err)
            setError(err instanceof Error ? err.message : 'Something went wrong')
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5 sm:space-y-6 px-2 animate-fade-in-scale">
            {/* Partner Name Input */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>Partner's Name ✨</label>
                <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Enter her name (e.g., Priya)"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-800 placeholder-gray-400 border-2 border-pink-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-premium bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    maxLength={30}
                    required
                    disabled={loading}
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Upload a photo of you two 📸
                </label>

                {imagePreview ? (
                    <div className="relative group animate-fade-in-scale">
                        <Image
                            src={imagePreview}
                            alt="Couple preview"
                            width={400}
                            height={300}
                            className="w-full h-52 sm:h-64 object-cover rounded-2xl border-2 border-pink-300 shadow-md group-hover:shadow-2xl transition-premium group-hover:border-pink-400"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setCoupleImage('')
                                setImagePreview('')
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-red-600 shadow-lg transform transition-premium hover:scale-125 hover:rotate-90 active:scale-95"
                            aria-label="Remove image"
                        >
                            ✕
                        </button>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-premium pointer-events-none"></div>
                    </div>
                ) : (
                    <label className="block w-full px-4 sm:px-6 py-6 sm:py-8 border-2 border-dashed border-pink-300 rounded-2xl text-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-premium bg-white group shadow-sm hover:shadow-lg">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={loading}
                        />
                        <span className="text-3xl sm:text-4xl mb-2 block group-hover:scale-125 transition-premium">💑</span>
                        <span className="text-gray-600 font-medium text-sm sm:text-base block">Click to upload photo</span>
                        <span className="block text-xs sm:text-sm text-gray-400 mt-1">JPG, PNG (Max 2MB)</span>
                    </label>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 sm:p-4 rounded-xl text-sm sm:text-base text-center border border-red-200 animate-fade-in">
                    <span className="font-medium">⚠️ {error}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !partnerName.trim() || !coupleImage}
                className="btn-premium w-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-premium transform hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-2xl disabled:hover:scale-100"
                style={{ fontFamily: 'var(--font-outfit)' }}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Magic...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <span>Create Valentine</span>
                        <span className="text-xl">💕</span>
                    </span>
                )}
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-500 px-4">
                ✨ It takes just 10 seconds. No signup needed.
            </p>
        </form>
    )
}
