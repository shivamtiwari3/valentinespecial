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

    // Track if this is the first view for email notification
    const isFirstView = valentine.view_count === 0
    const hasEmailNotification = valentine.notification_email && !valentine.email_notified

    // Increment view count
    await supabase
        .from('valentines')
        .update({ view_count: ((valentine.view_count || 0) + 1) })
        .eq('id', id)

    // Send email notification if it's the first view and user opted in
    if (isFirstView && hasEmailNotification) {
        console.log('📧 Attempting to send email notification to:', valentine.notification_email)
        try {
            const { sendViewNotification } = await import('@/app/api/notification/send/route')
            const valentineUrl = `${process.env.NEXT_PUBLIC_APP_URL}/v/${id}`

            console.log('📧 Email params:', {
                email: valentine.notification_email,
                partnerName: valentine.partner_name,
                valentineUrl
            })

            const result = await sendViewNotification({
                email: valentine.notification_email,
                partnerName: valentine.partner_name,
                valentineUrl
            })

            console.log('📧 Email result:', result)

            // Only mark as notified if email was actually sent successfully
            if (result.success) {
                await supabase
                    .from('valentines')
                    .update({ email_notified: true })
                    .eq('id', id)
                console.log('✅ Email sent and marked as notified')
            } else {
                console.error('❌ Email failed to send:', result.error)
            }
        } catch (emailError) {
            // Don't fail the page if email fails
            console.error('❌ Failed to send notification email:', emailError)
        }
    } else {
        console.log('📧 Skipping email:', { isFirstView, hasEmailNotification, view_count: valentine.view_count, email_notified: valentine.email_notified })
    }

    return <ValentineExperience partnerName={valentine.partner_name} coupleImage={valentine.couple_image} />
}
