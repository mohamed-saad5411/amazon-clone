'use client'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { useEffect } from 'react'
import { store as reduxStore } from '@/store/store'

function CartPersist() {
    useEffect(() => {
        // Load from localStorage on mount
        try {
            const saved = localStorage.getItem('cart-state')
            if (saved) {
                const { carts } = JSON.parse(saved)
                if (carts) {
                    reduxStore.dispatch({ type: 'cart/loadCart', payload: carts })
                }
            }
        } catch {}

        // Save to localStorage on change
        const unsubscribe = reduxStore.subscribe(() => {
            try {
                const state = reduxStore.getState()
                localStorage.setItem('cart-state', JSON.stringify(state.cart))
            } catch {}
        })

        return unsubscribe
    }, [])

    return null
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <CartPersist />
            {children}
        </Provider>
    )
}