'use client'
import { Order } from '@/lib/supabase'

const STATUS_STYLES: Record<string, { bg: string; color: string; dot: string; label: string }> = {
    pending:    { bg: 'bg-yellow-50',  color: 'text-yellow-700', dot: 'bg-yellow-400', label: 'Pending' },
    processing: { bg: 'bg-blue-50',   color: 'text-blue-700',   dot: 'bg-blue-400',   label: 'Processing' },
    shipped:    { bg: 'bg-purple-50', color: 'text-purple-700', dot: 'bg-purple-400', label: 'Shipped' },
    delivered:  { bg: 'bg-green-50',  color: 'text-green-700',  dot: 'bg-green-400',  label: 'Delivered' },
    cancelled:  { bg: 'bg-red-50',    color: 'text-red-700',    dot: 'bg-red-400',    label: 'Cancelled' },
    unknown:    { bg: 'bg-gray-50',   color: 'text-gray-500',   dot: 'bg-gray-300',   label: '—' },
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (mins > 0) return `${mins}m ago`
    return 'just now'
}

export default function RecentOrders({ orders }: { orders: Order[] }) {
    const recent = orders.slice(0, 8)

    return (
        <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h3 className='text-base font-black text-gray-900'>Recent Orders</h3>
                    <p className='text-xs text-gray-400 mt-0.5'>Last {recent.length} orders</p>
                </div>
                <div className='w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-sm'>🕐</div>
            </div>

            <div className='h-px bg-gray-100 mb-3' />

            {recent.length === 0 ? (
                <p className='text-center text-gray-300 text-sm py-8'>No orders yet</p>
            ) : (
                <div className='flex flex-col divide-y divide-gray-50'>
                    {recent.map((order) => {
                        const st = STATUS_STYLES[order.status ?? 'unknown'] ?? STATUS_STYLES.unknown
                        const items = Array.isArray(order.items) ? order.items : []
                        const itemCount = items.reduce((s, it) => s + (it.quantity ?? 1), 0)
                        const shortId = '#' + order.id.slice(0, 6).toUpperCase()

                        return (
                            <div key={order.id} className='flex items-center justify-between py-2.5 hover:bg-gray-50 px-1 rounded-lg transition-colors'>
                                <div className='flex items-center gap-2.5'>
                                    <div className={`w-2 h-2 rounded-full ${st.dot} flex-shrink-0`} />
                                    <div>
                                        <p className='text-xs font-bold text-gray-800 font-mono'>{shortId}</p>
                                        <p className='text-[10px] text-gray-400'>{itemCount} item{itemCount !== 1 ? 's' : ''} · {timeAgo(order.created_at)}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.bg} ${st.color}`}>{st.label}</span>
                                    <span className='text-sm font-black text-red-700 min-w-[50px] text-right'>${(order.total ?? 0).toFixed(2)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {orders.length > 8 && (
                <p className='text-xs text-gray-400 text-center mt-3'>+{orders.length - 8} more — see Orders tab</p>
            )}
        </div>
    )
}