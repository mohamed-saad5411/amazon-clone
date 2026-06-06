
export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    thumbnail: string
    rating: number
    image: string      // بعض الـ products بتيجي بـ image بدل thumbnail
    quantity?: number   // optional في الـ API، بس دايماً موجودة في الـ cart
}

// CartProduct ده اللي بيتخزن في الـ Redux
export interface CartProduct extends Product {
    quantity: number    // مش optional هنا — دايماً موجودة
}