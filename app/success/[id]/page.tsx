import { notFound, redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getShareUrl } from '@/lib/utils'
import ShareButtons from '@/components/ShareButtons'
import GitHubStarButton from '@/components/GitHubStarButton'
import EmailNotification from '@/components/EmailNotification'
import CopyButton from '@/components/CopyButton'
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
        <main className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 py-6 sm:py-10 px-4 flex items-center justify-center">
            <div className="container max-w-lg w-full">
                {/* Success Card */}
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 overflow-hidden relative">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-red-400 to-purple-400" />

                    <div className="text-center mb-6 mt-2">
                        <span className="text-4xl block mb-2 animate-bounce">🎉</span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                            Valentine is Ready!
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Created for <strong>{valentine.partner_name}</strong>
                        </p>
                    </div>

                    {/* Integrated Share Link Box */}
                    <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100 flex items-center gap-3 group hover:border-pink-200 transition-colors">
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide font-bold">Share Link</p>
                            <p className="text-pink-600 font-mono text-sm truncate selection:bg-pink-100">
                                {shareUrl}
                            </p>
                        </div>
                        <CopyButton text={shareUrl} />
                    </div>

                    {/* Primary Action: WhatsApp */}
                    <div className="space-y-3 mb-6">
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(`Hey ${valentine.partner_name}! 💖 I made something special for you: ${shareUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#20bd5a] hover:shadow-md transition-all transform active:scale-[0.98]"
                        >
                            <span className="text-xl">💬</span> Send on WhatsApp
                        </a>

                        <Link
                            href={`/v/${id}`}
                            target="_blank"
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-100 transition-all text-sm"
                        >
                            👁️ Preview Message
                        </Link>
                    </div>

                    {/* Email Notification Integration */}
                    <EmailNotification valentineId={id} partnerName={valentine.partner_name} />
                </div>

                {/* Footer Actions */}
                <div className="text-center space-y-4">
                    <Link
                        href="/"
                        className="inline-block text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors hover:underline"
                    >
                        Create New Valentine
                    </Link>

                    <div className="opacity-80 scale-90">
                        <GitHubStarButton />
                    </div>
                </div>
            </div>
        </main>
    )
}
