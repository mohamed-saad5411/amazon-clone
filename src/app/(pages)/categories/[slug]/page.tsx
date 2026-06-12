import Banner from '@/components/banner/Banner';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/product';
import React from 'react'

async function getCategoryProducts(slug: string): Promise<Product[]> {
    const res = await fetch(`https://dummyjson.com/products/category/${slug}?limit=100`)
    const data = await res.json()
    return data.products;
}


export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const products = await getCategoryProducts(slug)


    return (
        <section className='max-w-[1200px] mx-auto'>
            <Banner />
            <h1 className='text-2xl font-bold m-6 capitalize'>{slug.replace(/-/g, ' ')}</h1>
            <ProductGrid category={products} />
        </section>
    )
}