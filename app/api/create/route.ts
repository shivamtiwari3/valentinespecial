import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateValentineId, validatePartnerName, getShareUrl } from '@/lib/utils'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { partnerName, coupleImage } = body

        // Validate input
        const validation = validatePartnerName(partnerName)
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            )
        }

        // Generate unique ID
        const id = generateValentineId()
        const trimmedName = partnerName.trim()

        // Insert into database
        const { data, error } = await supabase
            .from('valentines')
            .insert([
                {
                    id,
                    partner_name: trimmedName,
                    couple_image: coupleImage, // Save the image!
                    view_count: 0
                }
            ])
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to create valentine' },
                { status: 500 }
            )
        }

        // Return success with ID and URL
        const url = getShareUrl(id)

        return NextResponse.json({
            id,
            url,
            partnerName: trimmedName
        })

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
