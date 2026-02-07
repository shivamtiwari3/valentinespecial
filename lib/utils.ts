import { nanoid } from 'nanoid'

export function generateValentineId(): string {
    return nanoid(8) // Generates an 8-character unique ID
}

export function getShareUrl(id: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/v/${id}`
}

export function getWhatsAppShareUrl(url: string, partnerName: string): string {
    const text = encodeURIComponent(`Hey! I made something special for you 💕 ${url}`)
    return `https://wa.me/?text=${text}`
}

export function validatePartnerName(name: string): { valid: boolean; error?: string } {
    const trimmed = name.trim()

    if (!trimmed) {
        return { valid: false, error: 'Name is required' }
    }

    if (trimmed.length > 30) {
        return { valid: false, error: 'Name must be 30 characters or less' }
    }

    return { valid: true }
}
