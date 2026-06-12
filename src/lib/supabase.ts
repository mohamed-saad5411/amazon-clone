// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
    id: number
    name: string
    title: string
    price: number
    quantity: number
    thumbnail?: string
    image?: string
}

export interface Order {
    id: string
    user_id: string
    items: OrderItem[]
    total: number
    status?: OrderStatus
    created_at: string
}