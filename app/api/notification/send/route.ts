import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import {
    sanitizeText,
    validateEmail,
    checkRateLimit,
    getClientIP,
    getSecurityHeaders
} from '@/lib/security'

const resend = new Resend(process.env.RESEND_API_KEY)

// Secret token for internal API calls (should be in env vars in production)
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET || 'valentine-internal-secret-change-me'

interface SendNotificationParams {
    email: string
    partnerName: string
    valentineUrl: string
}

export async function sendViewNotification({ email, partnerName, valentineUrl }: SendNotificationParams) {
    try {
        // Sanitize partner name to prevent XSS in email
        const safeName = sanitizeText(partnerName)

        // Validate and sanitize URL
        let safeUrl = valentineUrl
        try {
            const url = new URL(valentineUrl)
            // Only allow our domain
            const allowedHosts = [
                'localhost',
                'valentinespecial.vercel.app',
                'valentinespecial.com'
            ]
            if (!allowedHosts.some(host => url.hostname.includes(host))) {
                console.error('Invalid valentine URL host:', url.hostname)
                return { success: false, error: 'Invalid URL' }
            }
            safeUrl = url.toString()
        } catch {
            console.error('Invalid URL format:', valentineUrl)
            return { success: false, error: 'Invalid URL format' }
        }

        const { data, error } = await resend.emails.send({
            from: 'Valentine Special <notifications@valentinespecial.com>',
            to: [email],
            subject: `💖 ${safeName} just opened your Valentine!`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
                            margin: 0;
                            padding: 40px 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: white;
                            border-radius: 24px;
                            padding: 40px;
                            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .emoji {
                            font-size: 64px;
                            margin-bottom: 20px;
                        }
                        h1 {
                            color: #d81b60;
                            font-size: 28px;
                            margin: 0 0 10px 0;
                        }
                        .message {
                            color: #555;
                            font-size: 16px;
                            line-height: 1.6;
                            margin-bottom: 30px;
                        }
                        .cta {
                            text-align: center;
                            margin: 30px 0;
                        }
                        .button {
                            display: inline-block;
                            background: linear-gradient(135deg, #d81b60 0%, #e91e63 100%);
                            color: white;
                            padding: 16px 32px;
                            border-radius: 12px;
                            text-decoration: none;
                            font-weight: bold;
                            font-size: 16px;
                        }
                        .footer {
                            text-align: center;
                            color: #999;
                            font-size: 12px;
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #eee;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="emoji">💕</div>
                            <h1>Great News!</h1>
                        </div>
                        
                        <div class="message">
                            <p><strong>${safeName}</strong> just opened your Valentine surprise! 🎉</p>
                            <p>Your romantic gesture has been delivered successfully. We hope it brings you both closer together this Valentine's Day! 💖</p>
                        </div>

                        <div class="cta">
                            <a href="${safeUrl}" class="button">View Your Valentine</a>
                        </div>

                        <div class="footer">
                            <p>This is a one-time notification from Valentine Special</p>
                            <p>Made with ❤️ for spreading love</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        })

        if (error) {
            console.error('Resend error:', error)
            return { success: false, error }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Email send error:', error)
        return { success: false, error }
    }
}

// API route handler - PROTECTED with secret token
// This should only be called internally from the valentine view page
export async function POST(request: Request) {
    const securityHeaders = getSecurityHeaders()

    try {
        // Verify internal API secret
        const authHeader = request.headers.get('x-internal-secret')
        if (authHeader !== INTERNAL_API_SECRET) {
            // Rate limit to prevent brute force
            const clientIP = getClientIP(request)
            const rateLimit = checkRateLimit(`send-email:${clientIP}`, 3, 300000) // 3 per 5 minutes

            if (!rateLimit.allowed) {
                return NextResponse.json(
                    { error: 'Too many requests' },
                    { status: 429, headers: securityHeaders }
                )
            }

            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401, headers: securityHeaders }
            )
        }

        // Check content-type
        const contentType = request.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { error: 'Content-Type must be application/json' },
                { status: 415, headers: securityHeaders }
            )
        }

        // Parse body
        let body
        try {
            body = await request.json()
        } catch {
            return NextResponse.json(
                { error: 'Invalid JSON body' },
                { status: 400, headers: securityHeaders }
            )
        }

        const { email, partnerName, valentineUrl } = body

        // Validate email
        if (!validateEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400, headers: securityHeaders }
            )
        }

        // Validate partner name
        if (!partnerName || typeof partnerName !== 'string' || partnerName.length > 30) {
            return NextResponse.json(
                { error: 'Invalid partner name' },
                { status: 400, headers: securityHeaders }
            )
        }

        // Validate URL
        if (!valentineUrl || typeof valentineUrl !== 'string') {
            return NextResponse.json(
                { error: 'Invalid valentine URL' },
                { status: 400, headers: securityHeaders }
            )
        }

        const result = await sendViewNotification({ email, partnerName, valentineUrl })

        if (!result.success) {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500, headers: securityHeaders }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully'
        }, { headers: securityHeaders })

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500, headers: securityHeaders }
        )
    }
}
