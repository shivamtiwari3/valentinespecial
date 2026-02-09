import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
    validateEmail,
    validateValentineId,
    checkRateLimit,
    getClientIP,
    getSecurityHeaders
} from '@/lib/security'

export async function POST(request: Request) {
    const securityHeaders = getSecurityHeaders()

    try {
        // Check content-type
        const contentType = request.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { error: 'Content-Type must be application/json' },
                { status: 415, headers: securityHeaders }
            )
        }

        // Rate limiting (5 subscription attempts per minute per IP)
        const clientIP = getClientIP(request)
        const rateLimit = checkRateLimit(`subscribe:${clientIP}`, 5, 60000)

        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        ...securityHeaders,
                        'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
                    }
                }
            )
        }

        // Parse request body
        let body
        try {
            body = await request.json()
        } catch {
            return NextResponse.json(
                { error: 'Invalid JSON body' },
                { status: 400, headers: securityHeaders }
            )
        }

        const { valentineId, email } = body

        // Validate valentine ID format
        if (!validateValentineId(valentineId)) {
            return NextResponse.json(
                { error: 'Invalid valentine ID format' },
                { status: 400, headers: securityHeaders }
            )
        }

        // Validate email format
        if (!validateEmail(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400, headers: securityHeaders }
            )
        }

        const sanitizedEmail = email.trim().toLowerCase()

        // Validate valentine ID exists in database
        const { data: valentine, error: fetchError } = await supabase
            .from('valentines')
            .select('id')
            .eq('id', valentineId)
            .single()

        if (fetchError || !valentine) {
            return NextResponse.json(
                { error: 'Valentine not found' },
                { status: 404, headers: securityHeaders }
            )
        }

        // Update valentine with notification email
        const { error: updateError } = await supabase
            .from('valentines')
            .update({
                notification_email: sanitizedEmail,
                email_notified: false
            })
            .eq('id', valentineId)

        if (updateError) {
            console.error('Supabase error:', updateError)
            return NextResponse.json(
                { error: 'Failed to save notification preference' },
                { status: 500, headers: securityHeaders }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Email notification set up successfully!'
        }, { headers: securityHeaders })

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500, headers: securityHeaders }
        )
    }
}
