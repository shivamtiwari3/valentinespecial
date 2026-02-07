import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ValentineExperience from '@/components/ValentineExperience'
import type { Metadata } from 'next'

interface PageProps {
    params: Promise<{ id: string }>
}

// Generate OG metadata for social sharing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return {
        title: "Someone has a Valentine's surprise for you 💖",
        description: "Open this link to see a special message just for you",
        openGraph: {
            title: "Someone has a Valentine's surprise for you 💖",
            description: "Open this link to see a special message",
            images: ['/og-image.png'],
        },
        twitter: {
            card: 'summary_large_image',
        },
    }
}

export default async function ValentinePage({ params }: PageProps) {
    const { id } = await params

    // Handle demo route
    if (id === 'demo') {
        return <ValentineExperience partnerName="Sweetheart" />
    }

    // Fetch valentine data
    const { data: valentine, error } = await supabase
        .from('valentines')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !valentine) {
        notFound()
    }

    // Optionally increment view count
    await supabase
        .from('valentines')
        .update({ view_count: ((valentine.view_count || 0) + 1) })
        .eq('id', id)

    return <ValentineExperience partnerName={valentine.partner_name} coupleImage={valentine.couple_image} />
}
