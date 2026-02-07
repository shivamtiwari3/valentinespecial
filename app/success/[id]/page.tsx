import { notFound, redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getShareUrl } from '@/lib/utils'
import ShareButtons from '@/components/ShareButtons'
import GitHubStarButton from '@/components/GitHubStarButton'
import Link from 'next/link'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function SuccessPage({ params }: PageProps) {
    const { id } = await params

    // Fetch valentine data
    const { data: valentine, error } = await supabase
        .from('valentines')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !valentine) {
        redirect('/')
    }

    const shareUrl = getShareUrl(id)

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 py-16 px-4">
            <div className="container mx-auto max-w-2xl">
                {/* Success Animation */}
                <div className="text-center mb-8 animate-bounce">
                    <span className="text-7xl">💕</span>
                </div>

                {/* Success Message */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
                        Your Valentine is Ready! 🎉
                    </h1>

                    <p className="text-center text-gray-600 text-lg mb-8">
                        Share this special link with <strong>{valentine.partner_name}</strong> and make her day unforgettable!
                    </p>

                    {/* Shareable Link Display */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-2 border-pink-200">
                        <p className="text-sm text-gray-500 mb-2">Your shareable link:</p>
                        <p className="text-pink-600 font-mono text-sm md:text-base break-all">
                            {shareUrl}
                        </p>
                    </div>

                    {/* Share Buttons */}
                    <ShareButtons url={shareUrl} partnerName={valentine.partner_name} />

                    {/* Preview Button */}
                    <div className="mt-6">
                        <Link
                            href={`/v/${id}`}
                            target="_blank"
                            className="w-full block px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-semibold text-white text-center hover:from-purple-600 hover:to-pink-600 transition-all"
                        >
                            👁️ Preview (See what she'll see)
                        </Link>
                    </div>
                </div>

                {/* GitHub Star CTA */}
                <GitHubStarButton />

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="text-pink-600 hover:text-pink-700 underline font-medium"
                    >
                        ← Create another Valentine
                    </Link>
                </div>
            </div>
        </main>
    )
}
