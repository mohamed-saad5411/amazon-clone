'use client'
import { Order } from '@/lib/supabase'

interface Props { orders: Order[] }

function groupByDay(orders: Order[]): number[] {
    const map: Record<string, number> = {}
    orders.forEach((o) => {
        const day = o.created_at?.slice(0, 10) ?? ''
        map[day] = (map[day] || 0) + 1
    })
    return Object.values(map).slice(-14)
}

function groupRevenueByDay(orders: Order[]): number[] {
    const map: Record<string, number> = {}
    orders.forEach((o) => {
        const day = o.created_at?.slice(0, 10) ?? ''
        map[day] = (map[day] || 0) + (o.total ?? 0)
    })
    return Object.values(map).slice(-14)
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
    if (!values.length) return null
    const max = Math.max(...values, 1)
    const min = Math.min(...values)
    const w = 80, h = 28
    const pts = values.map((v, i) => {
        const x = (i / Math.max(values.length - 1, 1)) * w
        const y = h - ((v - min) / (max - min + 1)) * (h - 4) - 2
        return `${x},${y}`
    }).join(' ')

    return (
        <svg width={w} height={h}>
            <polyline fill='none' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' points={pts} />
        </svg>
    )
}

function StatCard({ label, value, sub, icon, color, sparkValues }: {
    label: string; value: string; sub: string; icon: string; color: string; sparkValues: number[]
}) {
    return (
        <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all'>
            <div className='flex justify-between items-start mb-4'>
                <div>
                    <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>{label}</p>
                    <p className='text-3xl font-black text-gray-900 mt-1'>{value}</p>
                </div>
                <div className='w-10 h-10 rounded-xl flex items-center justify-center text-xl' style={{ background: `${color}20` }}>
                    {icon}
                </div>
            </div>
            <Sparkline values={sparkValues} color={color} />
            <p className='text-xs text-gray-400 mt-1'>{sub}</p>
        </div>
    )
}

export default function StatCards({ orders }: Props) {
    const totalRevenue = orders.reduce((s, o) => s + (o.total ?? 0), 0)
    const aov = orders.length ? totalRevenue / orders.length : 0
    const itemsSold = orders.reduce((s, o) => {
        const items = Array.isArray(o.items) ? o.items : []
        return s + items.reduce((a, it) => a + (it.quantity ?? 1), 0)
    }, 0)

    return (
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
            <StatCard label='Total Revenue' value={`$${totalRevenue.toLocaleString()}`} sub='All time' icon='💰' color='#FF9900' sparkValues={groupRevenueByDay(orders)} />
            <StatCard label='Total Orders' value={orders.length.toLocaleString()} sub='All orders' icon='📦' color='#067D62' sparkValues={groupByDay(orders)} />
            <StatCard label='Avg. Order Value' value={`$${aov.toFixed(2)}`} sub='Per order' icon='🧾' color='#cc0c39' sparkValues={groupRevenueByDay(orders)} />
            <StatCard label='Items Sold' value={itemsSold.toLocaleString()} sub='Total units' icon='🛒' color='#232F3E' sparkValues={groupByDay(orders)} />
        </div>
    )
}