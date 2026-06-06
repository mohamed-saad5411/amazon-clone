// 'use client'
// import { createClient } from '@/lib/supabase/client'
// import { selectItems } from '@/store/slices/cartSlice'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

// export function useCartUser() {
//     const [userId, setUserId] = useState<string>('')
//     const supabase = createClient()
    

//     useEffect(() => {
//         supabase.auth.getUser().then(({ data }) => {
//             setUserId(data.user?.id || '')
//         })
//     }, [])

//     const cartItems = useSelector(selectItems(userId))

//     return { cartItems, userId }
// }


'use client'
import { createClient } from '@/lib/supabase/client'
import { selectItems } from '@/store/slices/cartSlice'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

export function useCartUser() {
    const [userId, setUserId] = useState<string>('')
    const supabase = useMemo(() => createClient(), [])

    useEffect(() => {
        // جيب الـ user الحالي أول ما الـ hook يتعمل
        supabase.auth.getUser().then(({ data }) => {
            setUserId(data.user?.id || '')
        })

        // استمع لأي تغيير في الـ session (login / logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUserId(session?.user?.id || '')
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    const cartItems = useSelector(selectItems(userId))

    return { cartItems, userId }
}