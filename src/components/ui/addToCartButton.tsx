'use client'
import { addToCart } from '@/store/slices/cartSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Product } from '@/types/product'
import { useCartUser } from '@/hooks/useCartUser'
import { useRouter } from 'next/navigation'

export default function AddToCartButton({ product }: { product: Product }) {
    const dispatch = useDispatch()
    const { userId } = useCartUser()
    const router = useRouter()

    function handleAddToCart() {
        dispatch(addToCart({ userId, product }))
        if(userId !== ''){
            toast.success("Item added to cart")
        }else{
            toast.error("Please log in to add items to cart")
            router.push('/login')
        }
    }

    return (
        <button onClick={handleAddToCart} className="btn btn-yellow w-full">
            Add to Cart
        </button>
    )
}