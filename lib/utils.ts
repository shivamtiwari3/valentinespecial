import { nanoid } from 'nanoid'

export function generateValentineId(): string {
    return nanoid(8) // Generates an 8-character unique ID
}

export function getShareUrl(id: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://valentinespecial.vercel.app'
    // Use query param for static export compatibility
    return `${baseUrl}/view?id=${id}`
}

export function getWhatsAppShareUrl(url: string, partnerName: string): string {
    const text = encodeURIComponent(`Hey! I made something special for you 💕 ${url}`)
    return `https://wa.me/?text=${text}`
}

// Note: Partner name validation is now handled in lib/security.ts
// Use sanitizePartnerName() from security.ts for comprehensive validation

