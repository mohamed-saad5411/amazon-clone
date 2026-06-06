'use client'
import { addToCart } from '@/store/slices/cartSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Product } from '@/types/product'
import { useCartUser } from '@/hooks/useCartUser'

export default function nextPageButtom({ product }: { product: Product }) {
    const dispatch = useDispatch()
    const { userId } = useCartUser()

    function handleAddToCart() {
        dispatch(addToCart({ userId, product: { ...product, quantity: 1 } }))
        toast.success("Item added to cart")
    }

    return <>
        <button onClick={handleAddToCart} className="btn btn-yellow w-full">
            Add to Cart
        </button>
    </>

}