'use client'
import React, { useState } from 'react'
import Banner from "@/components/banner/Banner";
import ProductFeed from "@/components/products/ProductFeed";
import { Product } from '@/types/product';
import Link from 'next/link';



export default function MainHome({ products, page }: { products: Product[], page: number }) {


  return <>
    <section className="max-w-[1200px] mx-auto">
      <Banner />
      <ProductFeed products={products} />

      <div className="flex justify-center my-10 gap-4">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`} className='btn btn-yellow'>{page - 1}</Link>
        )}
        <span className='flex items-center'>Page {page}</span>
        <Link href={`/?page=${page + 1}`} className='btn btn-yellow'>{page + 1}</Link>
      </div>
    </section>
  </>
}
