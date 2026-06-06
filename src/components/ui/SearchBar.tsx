'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [debouncedQuery] = useDebounce(query, 500)
    const router = useRouter()

    useEffect(() => {
        if (!debouncedQuery.trim()) return router.push(`/`)
        router.push(`/search?q=${debouncedQuery}`)
    }, [debouncedQuery])

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        if (!query.trim()) return
        router.push(`/search?q=${query}`)
    }

    return (
        <form onSubmit={handleSearch} className="flex mx-2 items-center flex-grow bg-yellow-500 cursor-pointer hover:bg-yellow-400 rounded-md">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='bg-white focus:outline-none rounded-l-md w-6 flex-grow p-2 text-sm'
                placeholder="Search..."
            />
            <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mx-2 rounded-r-md">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </form>
    )
}