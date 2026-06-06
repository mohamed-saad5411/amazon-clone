'use client'
import React from 'react'
import Image from 'next/image'
import ProductInHome from '@/components/ui/ProductInHome'
import { Product } from '@/types/product'

export default function ProductFeed({ products }: { products: Product[] }) {
    return (
        <div className='-mt-5 md:-mt-35 lg:-mt-45 grid grid-flow-row-dense w-3/4 m-auto lg:w-[90%] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {products.slice(0, 4).map(({ category, thumbnail, rating, title, id, price, description }) =>
                <ProductInHome
                    key={id}
                    category={category}
                    image={thumbnail}
                    rating={rating}
                    title={title}
                    id={id}
                    price={price}
                    description={description}
                />
            )}

            <div className='col-span-full relative w-full h-24'>
                <Image
                    src='https://images-eu.ssl-images-amazon.com/images/G/02/SBP/2018/gateway/1110572_smb_gw_desktop_1500x300_lavolio_1x_uk._CB484123630_.jpg'
                    alt='Amazon ad banner'
                    fill
                    className='object-cover'
                    loading='lazy'
                />
            </div>

            <div className='md:col-span-2'>
                {products.slice(4, 5).map(({ category, thumbnail, rating, title, id, price, description }) =>
                    <ProductInHome
                        key={id}
                        category={category}
                        image={thumbnail}
                        rating={rating}
                        title={title}
                        id={id}
                        price={price}
                        description={description}
                    />
                )}
            </div>

            {products.slice(5).map(({ category, thumbnail, rating, title, id, price, description }) =>
                <ProductInHome
                    key={id}
                    category={category}
                    image={thumbnail}
                    rating={rating}
                    title={title}
                    id={id}
                    price={price}
                    description={description}
                />
            )}
        </div>
    )
}


// amazon-clone-mohsaad
