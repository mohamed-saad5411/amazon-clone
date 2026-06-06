import MainHome from "@/components/home/MainHome";
import { Product } from "@/types/product";



async function getFeedProducts(page: number): Promise<Product[]> {
  const skip = (page - 1) * 30
  const res = await fetch(`https://dummyjson.com/products?limit=30&skip=${skip}`)
  const data = await res.json()
  return data.products;
}



export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1
  const products = await getFeedProducts(page)

  return <>
    <MainHome products={products} page={page} />
  </>
}
