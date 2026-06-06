'use client'
import { useCartUser } from '@/hooks/useCartUser'
import { decreaseQuantity, emptyCart, increaseQuantity, removeFromCart } from '@/store/slices/cartSlice'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function Cart() {
    const { cartItems, userId } = useCartUser()
    const dispatch = useDispatch()

    async function createCheckOutSession() {
        const stripe = await stripePromise

        const checkoutSession = await axios.post('/api/create-checkOut-session', {
            items: cartItems.map( item => ({...item, userId }) ),
            email: ''
        })

        window.location.href = checkoutSession.data.url
    }

    return (
        <section className='p-8 md:w-[80%] m-auto my-4'>
            <div className='col-span-4'>
                <Image
                    src="/images/carousel4.jpg"
                    alt="logo"
                    width={1000}
                    height={40}
                    className='object-contain h-auto w-full'
                />
                <h1 className='my-8 text-3xl font-bold text-start'>Shopping Basket</h1>

                <div className='flex flex-col gap-4'>
                    {(cartItems && cartItems.length > 0) ? cartItems.map((item) =>
                        <div key={item.id} className='grid bg-white p-4 shadow-md rounded-sm grid-cols-7'>
                            <div className='col-span-3 md:col-span-1 flex'>
                                <Image
                                    src={item.thumbnail || item.image}
                                    alt={item.title}
                                    width={1000}
                                    height={400}
                                    className='object-contain'
                                />
                            </div>
                            <div className='col-span-4 p-3 rounded-sm bg-gray-100 flex flex-col'>
                                <h3>{item.title}</h3>
                                <p className='my-3 text-sm flex-1'>{item.description}</p>
                                <p>Product Price: ${Number(item.price).toFixed(2)}</p>
                                <p>Subtotal: ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                            </div>
                            <div className='col-span-7 mt-9 md:col-span-2 p-2 flex flex-col justify-between gap-3'>
                                <div className='flex items-center justify-between'>
                                    <button
                                        onClick={() => dispatch(increaseQuantity({ userId, id: item.id }))}
                                        className='btn btn-add-or-remove'
                                    >+</button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(decreaseQuantity({ userId, id: item.id }))}
                                        className='btn btn-add-or-remove'
                                    >-</button>
                                </div>
                                <button
                                    onClick={() => dispatch(removeFromCart({ userId, id: item.id }))}
                                    className='text-sm btn btn-remove w-full'
                                >
                                    Delete from Cart
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='col-span-4 p-4'>
                            <p>Your cart is empty.</p>
                        </div>
                    )}
                </div>

                <div className='col-span-2 mt-4 p-4 bg-white rounded-md shadow-md'>
                    <h1 className='mb-8 text-3xl font-bold text-start'>Checkout</h1>
                    <p>Number of items: {cartItems ? cartItems.length : 0}</p>
                    <p>Total: ${cartItems
                        ? cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2)
                        : '0.00'}
                    </p>
                    <div className='grid gap-4 grid-cols-2 mt-8'>
                        <button
                            onClick={createCheckOutSession}
                            role='link'
                            className='btn btn-add-or-remove col-span-1'
                        >
                            Checkout
                        </button>
                        <button
                            onClick={() => dispatch(emptyCart({ userId }))}
                            className='btn btn-remove col-span-1'
                        >
                            Empty Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}