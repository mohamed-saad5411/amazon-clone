import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { email, password, username } = await req.json()
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
}