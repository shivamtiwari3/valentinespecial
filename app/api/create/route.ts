import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateValentineId, getShareUrl } from '@/lib/utils'
import {
    sanitizePartnerName,
    validateBase64Image,
    checkRateLimit,
    getClientIP,
    getSecurityHeaders
} from '@/lib/security'

// Maximum request body size (3MB to account for base64 overhead)
const MAX_BODY_SIZE = 3 * 1024 * 1024

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

        // Check content-length to prevent DoS
        const contentLength = request.headers.get('content-length')
        if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
            return NextResponse.json(
                { error: 'Request body too large. Maximum size is 3MB.' },
                { status: 413, headers: securityHeaders }
            )
        }

        // Rate limiting (10 requests per minute per IP)
        const clientIP = getClientIP(request)
        const rateLimit = checkRateLimit(`create:${clientIP}`, 10, 60000)

        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        ...securityHeaders,
                        'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
                        'X-RateLimit-Remaining': '0',
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

        const { partnerName, coupleImage } = body

        // Validate and sanitize partner name
        const nameValidation = sanitizePartnerName(partnerName)
        if (!nameValidation.valid) {
            return NextResponse.json(
                { error: nameValidation.error },
                { status: 400, headers: securityHeaders }
            )
        }

        // Validate image (optional but recommended)
        if (coupleImage) {
            const imageValidation = validateBase64Image(coupleImage)
            if (!imageValidation.valid) {
                return NextResponse.json(
                    { error: imageValidation.error },
                    { status: 400, headers: securityHeaders }
                )
            }
        }

        // Generate unique ID
        const id = generateValentineId()

        // Insert into database with sanitized data
        const { error } = await supabase
            .from('valentines')
            .insert([
                {
                    id,
                    partner_name: nameValidation.sanitized,
                    couple_image: coupleImage || null,
                    view_count: 0
                }
            ])
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to create valentine' },
                { status: 500, headers: securityHeaders }
            )
        }

        // Return success with ID and URL
        const url = getShareUrl(id)

        return NextResponse.json({
            id,
            url,
            partnerName: nameValidation.sanitized
        }, { headers: securityHeaders })

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500, headers: securityHeaders }
        )
    }
}
