'use client'
import { useState, useMemo } from 'react'
import { Order, OrderStatus } from '@/lib/supabase'

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: 'bg-yellow-50', color: 'text-yellow-700', label: 'Pending' },
  processing: { bg: 'bg-blue-50', color: 'text-blue-700', label: 'Processing' },
  shipped: { bg: 'bg-purple-50', color: 'text-purple-700', label: 'Shipped' },
  delivered: { bg: 'bg-green-50', color: 'text-green-700', label: 'Delivered' },
  cancelled: { bg: 'bg-red-50', color: 'text-red-700', label: 'Cancelled' },
  unknown: { bg: 'bg-gray-50', color: 'text-gray-500', label: '—' },
}

const PAGE_SIZE = 10

export default function OrdersTable({ orders, onStatusChange }: {
  orders: Order[]
  onStatusChange?: (orderId: string, status: OrderStatus) => Promise<void>
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatus] = useState('all')
  const [sortField, setSort] = useState<'created_at' | 'total'>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [updating, setUpdating] = useState<string | null>(null)

  const toggleSort = (field: 'created_at' | 'total') => {
    if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSort(field); setSortDir('desc') }
    setPage(1)
  }

  const filtered = useMemo(() => {
    let list = [...orders]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((o) => o.id.toLowerCase().includes(q) || o.user_id?.toLowerCase().includes(q))
    }
    if (statusFilter !== 'all') list = list.filter((o) => (o.status ?? 'unknown') === statusFilter)
    list.sort((a, b) => {
      const va = sortField === 'total' ? (a.total ?? 0) : new Date(a.created_at).getTime()
      const vb = sortField === 'total' ? (b.total ?? 0) : new Date(b.created_at).getTime()
      return sortDir === 'asc' ? va - vb : vb - va
    })
    return list
  }, [orders, search, statusFilter, sortField, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleStatus = async (orderId: string, status: OrderStatus) => {
    if (!onStatusChange) return
    setUpdating(orderId)
    await onStatusChange(orderId, status)
    setUpdating(null)
  }

  return (
    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
      {/* Header */}
      <div className='p-5 border-b border-gray-100 flex justify-between items-center gap-3 flex-wrap'>
        <div>
          <h3 className='text-base font-black text-gray-900'>All Orders</h3>
          <p className='text-xs text-gray-400 mt-0.5'>{filtered.length} results</p>
        </div>
        <div className='flex gap-2 flex-wrap'>
          <div className='flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-9'>
            <span className='text-gray-300 text-sm'>🔍</span>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder='Search order ID or user…'
              className='border-none bg-transparent outline-none text-sm text-gray-700 w-48'
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            className='h-9 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 px-3 outline-none cursor-pointer'
          >
            <option value='all'>All Statuses</option>
            <option value='pending'>Pending</option>
            <option value='processing'>Processing</option>
            <option value='shipped'>Shipped</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-50 border-b border-gray-100'>
              {['Order ID', 'User ID', 'Items', 'Total', 'Status', 'Date', 'Actions'].map((col) => (
                <th
                  key={col}
                  onClick={() => (col === 'Total' ? toggleSort('total') : col === 'Date' ? toggleSort('created_at') : null)}
                  className={`px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wide ${col === 'Total' || col === 'Date' ? 'cursor-pointer' : ''}`}
                >
                  {col}
                  {col === 'Total' && <span className='ml-1 text-yellow-500'>{sortField === 'total' ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>}
                  {col === 'Date' && <span className='ml-1 text-yellow-500'>{sortField === 'created_at' ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={7} className='text-center py-10 text-gray-300 text-sm'>No orders found</td></tr>
            ) : (
              paginated.map((order, i) => {
                const st = STATUS_STYLES[order.status ?? 'unknown'] ?? STATUS_STYLES.unknown
                const items = Array.isArray(order.items) ? order.items : []
                const itemSummary = items.length ? items.map((it) => `${it.title || it.name} ×${it.quantity ?? 1}`).join(', ') : '—'

                return (
                  <tr key={order.id} className={`border-b border-gray-50 hover:bg-yellow-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className='px-4 py-3'>
                      <span title={order.id} className='text-xs font-bold text-gray-800 font-mono cursor-help'>
                        {order.id.slice(0, 8)}…
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <span title={order.user_id} className='text-xs text-gray-500 font-mono cursor-help'>
                        {order.user_id?.slice(0, 10)}…
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <span title={itemSummary} className='text-xs text-gray-600 max-w-[160px] inline-block overflow-hidden text-ellipsis whitespace-nowrap align-middle'>
                        {itemSummary}
                      </span>
                      <span className='text-[11px] text-gray-400 ml-1'>({items.length})</span>
                    </td>
                    <td className='px-4 py-3'>
                      <span className='text-sm font-black text-red-700'>${(order.total ?? 0).toFixed(2)}</span>
                    </td>
                    <td className='px-4 py-3'>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${st.bg} ${st.color}`}>{st.label}</span>
                    </td>
                    <td className='px-4 py-3'>
                      <span className='text-xs text-gray-500'>
                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <select
                        disabled={updating === order.id}
                        defaultValue={order.status ?? ''}
                        onChange={(e) => handleStatus(order.id, e.target.value as OrderStatus)}
                        className='text-xs rounded-md border border-gray-200 bg-white text-gray-700 px-2 py-1 outline-none cursor-pointer disabled:opacity-50'
                      >
                        <option value='' disabled>Update…</option>
                        <option value='pending'>Pending</option>
                        <option value='processing'>Processing</option>
                        <option value='shipped'>Shipped</option>
                        <option value='delivered'>Delivered</option>
                        <option value='cancelled'>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='px-5 py-3 border-t border-gray-100 flex justify-between items-center'>
        <span className='text-xs text-gray-400'>
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>
        <div className='flex gap-1.5'>
          {[{ label: '«', action: () => setPage(1) }, { label: '‹', action: () => setPage((p) => p - 1) }].map(({ label, action }) => (
            <button key={label} onClick={action} disabled={page === 1}
              className='w-8 h-8 rounded-lg border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-all'>
              {label}
            </button>
          ))}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
            return (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg border text-sm font-bold transition-all ${p === page ? 'bg-yellow-500 border-yellow-500 text-white' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                {p}
              </button>
            )
          })}
          {[{ label: '›', action: () => setPage((p) => p + 1) }, { label: '»', action: () => setPage(totalPages) }].map(({ label, action }) => (
            <button key={label} onClick={action} disabled={page === totalPages}
              className='w-8 h-8 rounded-lg border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-all'>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}