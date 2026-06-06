'use client'
import { addToCart } from '@/store/slices/cartSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Product } from '@/types/product'

export default function nextPageButtom({ product }: { product: Product }) {
    const dispatch = useDispatch()

    function handleAddToCart() {
        dispatch(addToCart({ ...product, quantity: 1 }))
        toast.success("Item added to cart")
    }

    return <>
        <button onClick={handleAddToCart} className="btn btn-yellow w-full">
            Add to Cart
        </button>
    </>

}