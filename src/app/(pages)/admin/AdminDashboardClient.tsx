'use client'
import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Order, OrderStatus } from '@/lib/supabase'
import StatCards from './components/StatCards'
import RevenueChart from './components/RevenueChart'
import OrdersTable from './components/OrdersTable'
import RecentOrders from './components/RecentOrders'
import { User } from '@supabase/supabase-js'

interface Props {
    initialOrders: Order[]
    initialUsers: User[]
}

type ActiveTab = 'overview' | 'orders' | 'users'

const NAV_ITEMS: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '◈' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'users', label: 'Users', icon: '👥' },

]

export default function AdminDashboardClient({ initialOrders, initialUsers }: Props) {
    const [orders, setOrders] = useState<Order[]>(initialOrders)
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [tab, setTab] = useState<ActiveTab>('overview')
    const [sidebarOpen, setSidebar] = useState(true)
    const [refreshing, setRefresh] = useState(false)
    const supabase = createClient()

    const totalRevenue = orders.reduce((s, o) => s + (o.total ?? 0), 0)
    const todayOrders = orders.filter(
        (o) => new Date(o.created_at).toDateString() === new Date().toDateString()
    ).length

    const refresh = useCallback(async () => {
        setRefresh(true)
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
        if (!error && data) setOrders(data as Order[])
        setRefresh(false)
    }, [])

    const handleStatusChange = useCallback(async (orderId: string, status: OrderStatus) => {
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
        if (!error) {
            setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
        }
    }, [])

    return (
        <div className='flex min-h-screen bg-gray-100'>
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} flex-shrink-0 bg-[#232F3E] flex flex-col transition-all duration-300 sticky top-0 h-screen overflow-hidden`}>
                {/* Logo */}
                <div className='h-15 flex items-center gap-3 px-4 bg-[#131921] flex-shrink-0 py-4'>
                    <div className='w-8 h-8 rounded-md bg-yellow-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0'>a</div>
                    {sidebarOpen && (
                        <div>
                            <p className='text-yellow-500 font-black text-sm leading-none'>amazon</p>
                            <p className='text-gray-500 text-[9px] font-bold tracking-widest'>SELLER CENTRAL</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className='flex-1 p-2 flex flex-col gap-1 mt-2'>
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full
                                ${tab === item.id
                                    ? 'bg-yellow-500/10 text-yellow-500 border-l-4 border-yellow-500'
                                    : 'text-gray-400 hover:bg-white/5 border-l-4 border-transparent'}
                                ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
                        >
                            <span className='text-lg flex-shrink-0'>{item.icon}</span>
                            {sidebarOpen && <span className='whitespace-nowrap'>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Quick Stats */}
                {sidebarOpen && (
                    <div className='mx-3 mb-4 p-3 bg-[#131921] rounded-xl'>
                        <p className='text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2'>Quick Stats</p>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between'>
                                <span className='text-[11px] text-gray-500'>Total Revenue</span>
                                <span className='text-xs font-black text-yellow-500'>${totalRevenue.toLocaleString()}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-[11px] text-gray-500'>Today's Orders</span>
                                <span className='text-xs font-black text-yellow-500'>{todayOrders}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-[11px] text-gray-500'>Total Orders</span>
                                <span className='text-xs font-black text-white'>{orders.length}</span>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main */}
            <main className='flex-1 flex flex-col min-w-0'>
                {/* Topbar */}
                <header className='h-15 bg-[#131921] flex items-center justify-between px-6 sticky top-0 z-20 shadow-lg py-4'>
                    <div className='flex items-center gap-4'>
                        <button onClick={() => setSidebar((v) => !v)} className='text-gray-400 hover:text-white text-xl p-1 rounded'>≡</button>
                        <h1 className='text-white font-black text-lg'>
                            {tab === 'overview' ? 'Dashboard Overview' : 'Order Management'}
                        </h1>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={refresh}
                            disabled={refreshing}
                            className='flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-600 text-gray-400 text-xs font-bold hover:bg-gray-700 disabled:opacity-50 transition-all'
                        >
                            <span className={refreshing ? 'animate-spin' : ''}>↻</span>
                            Refresh
                        </button>
                        <div className='flex gap-2'>
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setTab(item.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                        ${tab === item.id ? 'bg-yellow-500 text-white' : 'bg-[#232F3E] text-gray-400'}`}
                                >
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className='p-6 flex flex-col gap-5 flex-1'>
                    {tab === 'overview' && (
                        <>
                            <StatCards orders={orders} />
                            <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                                <div className='xl:col-span-2'>
                                    <RevenueChart orders={orders} />
                                </div>
                                <RecentOrders orders={orders} />
                            </div>
                            <TopItemsSummary orders={orders} />
                        </>
                    )}
                    {tab === 'orders' && (
                        <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
                    )}
                    {tab === 'users' && (
                        <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
                            <div className='p-5 border-b border-gray-100'>
                                <h3 className='text-base font-black text-gray-900'>All Users</h3>
                                <p className='text-xs text-gray-400 mt-0.5'>{users.length} users</p>
                            </div>
                            <table className='w-full border-collapse'>
                                <thead>
                                    <tr className='bg-gray-50 border-b border-gray-100'>
                                        {['Email', 'Username', 'Role', 'Joined'].map((col) => (
                                            <th key={col} className='px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wide'>
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => (
                                        <tr key={user.id} className={`border-b border-gray-50 hover:bg-yellow-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                            <td className='px-4 py-3 text-sm text-gray-700'>{user.email}</td>
                                            <td className='px-4 py-3 text-sm text-gray-500'>{user.username || '—'}</td>
                                            <td className='px-4 py-3'>
                                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${user.role === 'admin' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50 text-gray-500'}`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className='px-4 py-3 text-xs text-gray-400'>
                                                {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

function TopItemsSummary({ orders }: { orders: Order[] }) {
    const itemMap: Record<string, { name: string; qty: number; revenue: number }> = {}
    orders.forEach((o) => {
        const items = Array.isArray(o.items) ? o.items : []
        items.forEach((it) => {
            const key = it.title || it.name
            if (!itemMap[key]) itemMap[key] = { name: key, qty: 0, revenue: 0 }
            itemMap[key].qty += it.quantity ?? 1
            itemMap[key].revenue += (it.price ?? 0) * (it.quantity ?? 1)
        })
    })

    const topItems = Object.values(itemMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
    const maxRevenue = Math.max(...topItems.map((i) => i.revenue), 1)
    const colors = ['bg-yellow-500', 'bg-green-600', 'bg-gray-800', 'bg-red-600', 'bg-indigo-500']

    if (!topItems.length) return null

    return (
        <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
            <h3 className='text-base font-black text-gray-900 mb-4'>Top Selling Items</h3>
            <div className='flex flex-col gap-4'>
                {topItems.map((item, i) => (
                    <div key={item.name}>
                        <div className='flex justify-between mb-1.5'>
                            <div className='flex items-center gap-2'>
                                <div className={`w-2 h-2 rounded-sm ${colors[i]} flex-shrink-0`} />
                                <span className='text-sm font-semibold text-gray-700 line-clamp-1'>{item.name}</span>
                            </div>
                            <div className='flex gap-5'>
                                <span className='text-xs text-gray-400'>{item.qty} units</span>
                                <span className='text-sm font-black text-red-700'>${item.revenue.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                            <div
                                className={`h-full ${colors[i]} rounded-full transition-all duration-700`}
                                style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}