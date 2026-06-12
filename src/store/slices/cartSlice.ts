import { CartProduct, Product } from "@/types/product"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartState {
    carts: { [userId: string]: CartProduct[] }
}

const initialState: CartState = {
    carts: {},
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ userId: string; product: Product }>) => {
            const { userId, product } = action.payload
            if (!state.carts[userId]) state.carts[userId] = []
            const existing = state.carts[userId].find(i => i.id === product.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.carts[userId].push({ ...product, quantity: 1 })
            }
        },
        removeFromCart: (state, action: PayloadAction<{ userId: string; id: number }>) => {
            const { userId, id } = action.payload
            if (!state.carts[userId]) return
            state.carts[userId] = state.carts[userId].filter(i => i.id !== id)
        },
        increaseQuantity: (state, action: PayloadAction<{ userId: string; id: number }>) => {
            const { userId, id } = action.payload
            const item = state.carts[userId]?.find(i => i.id === id)
            if (item) item.quantity += 1
        },
        decreaseQuantity: (state, action: PayloadAction<{ userId: string; id: number }>) => {
            const { userId, id } = action.payload
            const item = state.carts[userId]?.find(i => i.id === id)
            if (item) {
                if (item.quantity > 1) item.quantity -= 1
                else state.carts[userId] = state.carts[userId].filter(i => i.id !== id)
            }
        },
        emptyCart: (state, action: PayloadAction<{ userId: string }>) => {
            const { userId } = action.payload
            state.carts[userId] = []
        },
        loadCart: (state, action) => {
            state.carts = action.payload
        },
    }
})

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
    loadCart
} = cartSlice.actions

export const selectItems = (userId: string) => (state: { cart: CartState }) =>
    state.cart.carts[userId] || []

export default cartSlice.reducer