// 'use client'
// import { emptyCart } from '@/store/slices/cartSlice'
// import { useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { useSearchParams } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
// import axios from 'axios'

// export default function Success() {
//     const dispatch = useDispatch()
//     const searchParams = useSearchParams()
//     const hasSaved = useRef(false)
//     const supabase = createClient()

//     useEffect(() => {
//         if (hasSaved.current) return

//         const sessionId = searchParams?.get('session_id')
//         if (!sessionId) return

//         async function saveOrder() {
//             const { data: { user } } = await supabase.auth.getUser()
//             if (!user) return

//             // اقرأ الـ cart من localStorage مباشرة
//             const cartState = localStorage.getItem('cart-state')
//             if (!cartState) return

//             const { carts } = JSON.parse(cartState)
//             const items = carts?.[user.id] || []
//             if (!items.length) return

//             const total = items.reduce((acc: number, item: any) =>
//                 acc + (Number(item.price) * (item.quantity || 1)), 0)

//             await axios.post('/api/orders/create', {
//                 userId: user.id,
//                 items,
//                 total: total.toFixed(2),
//             })

//             hasSaved.current = true
//             dispatch(emptyCart({ userId: user.id }))
//             // امسح من localStorage
//             localStorage.removeItem('cart-state')
//         }

//         saveOrder().catch(console.error)
//     }, [])

//     return (
//         <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
//             <h1 className='text-3xl font-bold text-green-600'>Order Placed Successfully! 🎉</h1>
//             <p className='text-gray-500'>Thank you for your purchase.</p>
//             <button onClick={() => window.location.href = '/orders'} className='btn btn-yellow mt-4'>
//                 View Orders
//             </button>
//             <button onClick={() => window.location.href = '/'} className='text-sm text-gray-400 hover:text-gray-600'>
//                 Continue Shopping
//             </button>
//         </div>
//     )
// }


import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SuccessClient from './SuccessClient'

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string; user_id?: string }>
}) {
    const { session_id, user_id } = await searchParams

    if (!session_id) redirect('/')

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session_id)
        .eq('user_id', user.id)

    return <SuccessClient userId={user.id} sessionId={session_id} />
}