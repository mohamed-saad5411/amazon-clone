'use client'
import { useState } from 'react'
import { Order } from '@/lib/supabase'

type Range = '7D' | '30D' | '90D' | 'ALL'

function getRange(orders: Order[], range: Range): Order[] {
  const days = range === '7D' ? 7 : range === '30D' ? 30 : range === '90D' ? 90 : 9999
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return orders.filter((o) => new Date(o.created_at) >= cutoff)
}

function groupByPeriod(orders: Order[], range: Range) {
  const grouped: Record<string, { revenue: number; count: number }> = {}
  orders.forEach((o) => {
    const d = new Date(o.created_at)
    const key = range === '7D'
      ? d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      : range === '30D'
        ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    if (!grouped[key]) grouped[key] = { revenue: 0, count: 0 }
    grouped[key].revenue += o.total ?? 0
    grouped[key].count += 1
  })
  return Object.entries(grouped).map(([label, val]) => ({ label, ...val }))
}

export default function RevenueChart({ orders }: { orders: Order[] }) {
  const [range, setRange] = useState<Range>('30D')
  const [hovered, setHovered] = useState<number | null>(null)
  const [metric, setMetric] = useState<'revenue' | 'count'>('revenue')

  const filtered = getRange(orders, range)
  const points = groupByPeriod(filtered, range)
  const values = points.map((p) => metric === 'revenue' ? p.revenue : p.count)
  const maxVal = Math.max(...values, 1)

  const W = 680, H = 180
  const pad = { top: 10, right: 12, bottom: 24, left: 48 }
  const chartW = W - pad.left - pad.right
  const chartH = H - pad.top - pad.bottom

  const coords = values.map((v, i) => ({
    x: pad.left + (i / Math.max(values.length - 1, 1)) * chartW,
    y: pad.top + chartH - (v / maxVal) * chartH,
    v,
    label: points[i]?.label ?? '',
  }))

  const pathD = coords.length > 1 ? coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ') : ''
  const areaD = coords.length > 1 ? `M ${coords[0].x} ${pad.top + chartH} ${pathD.slice(1)} L ${coords[coords.length - 1].x} ${pad.top + chartH} Z` : ''

  return (
    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
      <div className='flex justify-between items-center mb-5'>
        <div>
          <h3 className='text-base font-black text-gray-900'>Revenue Overview</h3>
          <p className='text-xs text-gray-400 mt-0.5'>
            {filtered.length} orders · ${filtered.reduce((s, o) => s + (o.total ?? 0), 0).toLocaleString()} total
          </p>
        </div>
        <div className='flex gap-2'>
          <div className='flex bg-gray-100 rounded-lg p-0.5 gap-0.5'>
            {(['revenue', 'count'] as const).map((m) => (
              <button key={m} onClick={() => setMetric(m)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${metric === m ? 'bg-yellow-500 text-white' : 'text-gray-500'}`}>
                {m === 'revenue' ? 'Revenue' : 'Orders'}
              </button>
            ))}
          </div>
          <div className='flex bg-gray-100 rounded-lg p-0.5 gap-0.5'>
            {(['7D', '30D', '90D', 'ALL'] as Range[]).map((r) => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${range === r ? 'bg-gray-800 text-white' : 'text-gray-500'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <svg width='100%' viewBox={`0 0 ${W} ${H}`} className='block'>
        <defs>
          <linearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#FF9900' stopOpacity='0.25' />
            <stop offset='100%' stopColor='#FF9900' stopOpacity='0' />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <g key={i}>
            <line x1={pad.left} y1={pad.top + chartH - f * chartH} x2={W - pad.right} y2={pad.top + chartH - f * chartH} stroke='#f0f0f0' strokeWidth={1} />
            <text x={pad.left - 6} y={pad.top + chartH - f * chartH + 4} textAnchor='end' fontSize={9} fill='#bbb'>
              {metric === 'revenue' ? `$${((f * maxVal) / 1000).toFixed(0)}k` : Math.round(f * maxVal)}
            </text>
          </g>
        ))}
        {areaD && <path d={areaD} fill='url(#grad)' />}
        {pathD && <path d={pathD} fill='none' stroke='#FF9900' strokeWidth={2.5} strokeLinecap='round' strokeLinejoin='round' />}
        {coords.map((c, i) => (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className='cursor-pointer'>
            <rect x={c.x - 16} y={pad.top} width={32} height={chartH} fill='transparent' />
            <circle cx={c.x} cy={c.y} r={hovered === i ? 5 : 3.5} fill={hovered === i ? '#FF9900' : '#fff'} stroke='#FF9900' strokeWidth={2} />
            {hovered === i && (
              <g>
                <rect x={c.x - 44} y={c.y - 46} width={88} height={38} rx={7} fill='#232F3E' />
                <text x={c.x} y={c.y - 30} textAnchor='middle' fontSize={9} fill='#aaa'>{c.label}</text>
                <text x={c.x} y={c.y - 16} textAnchor='middle' fontSize={12} fill='#FF9900' fontWeight={800}>
                  {metric === 'revenue' ? `$${c.v.toLocaleString()}` : `${c.v} orders`}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}