'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ValentineExperience from '@/components/ValentineExperience'
import { startTransition } from 'react'

function ViewValentineContent() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [valentine, setValentine] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!id) {
            setLoading(false)
            return
        }

        async function fetchValentine() {
            try {
                // Fetch valentine data
                const { data, error: fetchError } = await supabase
                    .from('valentines')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (fetchError || !data) {
                    setError(true)
                    return
                }

                setValentine(data)

                // Increment view count (fire and forget)
                // We use rpc or just update. To avoid race conditions, rpc is better but simple update is fine for this
                await supabase
                    .from('valentines')
                    .update({ view_count: (data.view_count || 0) + 1 })
                    .eq('id', id)

            } catch (err) {
                console.error('Error fetching valentine:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchValentine()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading surprise...</p>
                </div>
            </div>
        )
    }

    if (error || !id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">💔</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Valentine Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        We couldn't find this Valentine. The link might be incorrect or expired.
                    </p>
                    <a href="/" className="btn-premium px-6 py-3 rounded-xl text-white font-medium inline-block">
                        Create Your Own
                    </a>
                </div>
            </div>
        )
    }

    return <ValentineExperience partnerName={valentine.partner_name} coupleImage={valentine.couple_image} />
}

export default function ViewValentinePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-pink-50">
                <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        }>
            <ViewValentineContent />
        </Suspense>
    )
}
