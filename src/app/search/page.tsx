import Banner from '@/components/banner/Banner'
import MainHome from '@/components/home/MainHome'
import ProductInHome from '@/components/ui/ProductInHome'
import { Product } from '@/types/product'

async function searchProducts(query: string): Promise<Product[]> {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=30`)
    const data = await res.json()
    return data.products
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams
    const query = q || ''
    const products = await searchProducts(query)

    return (
        <section className='max-w-[1200px] mx-auto p-4'>
            <Banner />
            <h1 className='text-2xl font-bold my-6'>
                Search results for: <span className='text-yellow-500'>"{query}"</span>
            </h1>
            {products.length === 0 ? (
                <p className='text-gray-500'>No products found.</p>
            ) : (
                <div className='grid sm:grid-cols-2 w-3/4 m-auto lg:w-[90%] lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {products.map((product) => (
                        <div key={product.id}>
                            {/* <ProductInHome product={product} /> */}
                            <ProductInHome
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                description={product.description}
                                category={product.category}
                                image={product.thumbnail}
                                rating={product.rating}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}