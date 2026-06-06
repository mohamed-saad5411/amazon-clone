import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { items, total, userId } = await req.json()
    const supabase = await createClient()

    const { error } = await supabase.from('orders').insert({
        user_id: userId,
        items: items,
        total: total,
    })
    console.log('supabase err:', error);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
}