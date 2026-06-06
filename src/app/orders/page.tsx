'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        async function getOrders() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (!error) setOrders(data || [])
            setLoading(false)
        
        }

        getOrders()
    }, [])

    if (loading) return <div className='flex justify-center items-center min-h-screen'>Loading...</div>

    return (
        <section className='p-8 md:w-[80%] m-auto my-4'>
            <h1 className='text-3xl font-bold mb-8'>Your Orders</h1>

            {orders.length === 0 ? (
                <p className='text-gray-500'>No orders yet.</p>
            ) : (
                <div className='flex flex-col gap-4'>
                    {orders.map((order) => {
                        console.log(order.created_at);
                        
                        return  <>
                        <div key={order.id} className='bg-white p-4 rounded-md shadow-md'>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-sm text-gray-500'>
                                    {new Date(order.created_at).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                        timeZone: 'UTC'
                                    })
                                    
                                    }
                                </p>
                                <p className='font-bold text-lg'>${order.total}</p>
                            </div>
                            <p className='text-sm text-gray-600'>{order.items.length} items</p>
                            <div className='mt-3 flex flex-col gap-2'>
                                {order.items.map((item: any) => (
                                    <div key={item.id} className='flex items-center gap-3'>
                                        <img src={item.thumbnail || item.image} alt={item.title} className='w-12 h-12 object-contain' />
                                        <div>
                                            <p className='text-sm font-medium line-clamp-1'>{item.title}</p>
                                            <p className='text-xs text-gray-500'>x{item.quantity} — ${Number(item.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </>
                    })}
                </div>
            )}
        </section>
    )
}