import { NextRequest, NextResponse } from "next/server"

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {

    const { items } = await req.json()

    const transformedItems = items.map((item: any) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.thumbnail || item.image]
            },
            unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity || 1
    }))

    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     shipping_address_collection: {
    //         allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI', 'BE', 'CH', 'AT']
    //     },
    //     line_items: transformedItems,
    //     mode: 'payment',
    //     // success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    //     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    //     metadata: {
    //         images: JSON.stringify(items.map((item: any) => item.thumbnail || item.image))
    //     }
    // })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI', 'BE', 'CH', 'AT']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cart`,
        metadata: {
            // items: JSON.stringify(items),
            userId: items[0]?.userId || '',
            // images: JSON.stringify(items.map((item: any) => item.thumbnail || item.image))
        }
    })

    return NextResponse.json({ id: session.id, url: session.url })

}
