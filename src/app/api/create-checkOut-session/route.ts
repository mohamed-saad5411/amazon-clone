import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await req.json()

    const transformedItems = items.map((item: any) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.thumbnail || item.image],
            },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'EG'],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_HOST}/success?session_id={CHECKOUT_SESSION_ID}&user_id=${user.id}`,
        // success_url: `${process.env.NEXT_PUBLIC_HOST}/success?session_id={CHECKOUT_SESSION_ID}&user_id=${user.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/cart`,
        // cancel_url: `${process.env.NEXT_PUBLIC_HOST}/cart`,
        metadata: {
            userId: user.id,
        },
    })

    await supabase.from('orders').insert({
        user_id: user.id,
        items: items,
        total: items.reduce((acc: number, item: any) =>
            acc + (item.price * (item.quantity || 1)), 0).toFixed(2),
        status: 'pending',
        stripe_session_id: session.id,
    })

    return NextResponse.json({ url: session.url })
}