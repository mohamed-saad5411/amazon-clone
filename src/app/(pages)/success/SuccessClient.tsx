// 'use client'
// import { emptyCart } from '@/store/slices/cartSlice'
// import { useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { useCartUser } from '@/hooks/useCartUser'
// import axios from 'axios'

// export default function SuccessClient({ userId, sessionId }: { userId: string; sessionId: string }) {
//     const dispatch = useDispatch()
//     const { cartItems } = useCartUser()
//     const hasSaved = useRef(false)

//     useEffect(() => {
//         if (hasSaved.current) return
//         if (!userId || !sessionId) return
//         if (cartItems.length === 0) return

//         const total = cartItems.reduce((acc, item) =>
//             acc + (Number(item.price) * (item.quantity || 1)), 0)

//         axios.post('/api/orders/create', {
//             userId,
//             items: cartItems,
//             total: total.toFixed(2),
//         }).then(() => {
//             hasSaved.current = true
//             dispatch(emptyCart({ userId }))
//         }).catch(console.error)
//     }, [userId, cartItems])

//     return (
//         <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
//             <h1 className='text-3xl font-bold text-green-600'>Order Placed Successfully! 🎉</h1>
//             <p className='text-gray-500'>Thank you for your purchase.</p>
//             <a href='/orders' className='btn btn-yellow mt-4'>View Orders</a>
//             <a href='/' className='text-sm text-gray-400 hover:text-gray-600'>Continue Shopping</a>
//         </div>
//     )
// }


'use client'
import { emptyCart } from '@/store/slices/cartSlice'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function SuccessClient({ userId }: { userId: string }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(emptyCart({ userId }))
    }, [userId])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
            <h1 className='text-3xl font-bold text-green-600'>Order Placed Successfully! 🎉</h1>
            <p className='text-gray-500'>Thank you for your purchase.</p>
            <Link href='/orders' className='btn btn-yellow mt-4'>View Orders</Link>
            <Link href='/' className='text-sm text-gray-400 hover:text-gray-600'>Continue Shopping</Link>
        </div>
    )
}