'use client'
import { emptyCart } from '@/store/slices/cartSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCartUser } from '@/hooks/useCartUser'
import axios from 'axios'

export default function Success() {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { userId, cartItems } = useCartUser()
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (!userId) return
        if (saved) return

        const sessionId = searchParams.get('session_id')
        if (!sessionId) return

        if (cartItems.length === 0) return

        const total = cartItems.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0)

        axios.post('/api/orders/create', {
            userId,
            items: cartItems,
            total: total.toFixed(2),
        }).then((res) => {
            console.log('Order saved:', res.data)
            dispatch(emptyCart({ userId }))
            setSaved(true)
        }).catch((err) => {
            console.error('Error saving order:', err)
        })
    }, [userId, cartItems, saved])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-3xl font-bold text-green-600'>Order Placed Successfully! 🎉</h1>
            <p className='text-gray-500 mt-4'>Thank you for your purchase.</p>
            <button onClick={() => router.push('/')} className='btn btn-yellow mt-8'>
                Continue Shopping
            </button>
        </div>
    )
}