

'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                router.refresh()
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    return <>{children}</>
}