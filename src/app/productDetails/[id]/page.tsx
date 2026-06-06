
import ProductImageCarousel from '@/components/products/ProductImageCarousel'
import AddToCartButton from '@/components/ui/addToCartButton'
import Image from 'next/image'

async function fetchProductDetails(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  return res.json()
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await fetchProductDetails(id)

  return (
    <section className='max-w-[1200px] mx-auto p-6 mt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 bg-white p-6 rounded-md shadow-md'>

        {/* Images */}
        {/* <div className='col-span-1 flex flex-col gap-3'>
          <div className='relative h-80 w-full'>
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className='object-contain'
            />
          </div>
          <div className='flex gap-2 flex-wrap'>
            {product.images?.map((img: string, i: number) => (
              <div key={i} className='relative w-16 h-16 border rounded-md overflow-hidden'>
                <Image src={img} alt={`img-${i}`} fill className='object-contain' />
              </div>
            ))}
          </div>
        </div> */}
        <ProductImageCarousel images={product.images} thumbnail={product.thumbnail} />

        {/* Details */}
        <div className='col-span-1 flex flex-col gap-3'>
          <p className='text-xs text-blue-500 uppercase'>{product.category}</p>
          <h1 className='text-2xl font-bold'>{product.title}</h1>
          <p className='text-sm text-gray-500'>{product.brand}</p>

          {/* Rating */}
          <div className='flex items-center gap-2'>
            <div className='flex text-yellow-400'>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className='text-sm text-gray-500'>{product.rating} / 5</span>
          </div>

          <div className='border-t border-gray-200 pt-3'>
            <p className='text-3xl font-bold text-red-600'>${Number(product.price).toFixed(2)}</p>
            {product.discountPercentage && (
              <p className='text-sm text-green-600'>Save {product.discountPercentage}%</p>
            )}
          </div>

          <p className='text-sm text-gray-600'>{product.description}</p>

          <div className='text-sm space-y-1 text-gray-600'>
            <p><span className='font-medium'>Stock:</span> {product.stock} items</p>
            <p><span className='font-medium'>Shipping:</span> {product.shippingInformation}</p>
            <p><span className='font-medium'>Warranty:</span> {product.warrantyInformation}</p>
            <p><span className='font-medium'>Return Policy:</span> {product.returnPolicy}</p>
          </div>
          {/* Checkout box */}
          <div className='col-span-1 border border-gray-200 rounded-sm shadow-sm p-4 flex flex-col gap-4 h-fit'>
            <p className='text-2xl font-bold'>${Number(product.price).toFixed(2)}</p>
            <p className='text-sm text-green-600'>{product.shippingInformation}</p>
            <p className={`text-sm font-medium ${product.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-500'}`}>
              {product.availabilityStatus}
            </p>
            <AddToCartButton product={{
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              thumbnail: product.thumbnail,
              rating: product.rating,
            }} />
            <p className='text-xs text-gray-500 text-center'>Ships from and sold by Amazon Clone</p>
          </div>
        </div>

      </div>

      {/* Reviews */}
      <div className='mt-8 bg-white p-6 rounded-md shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Customer Reviews</h2>
        <div className='flex flex-col gap-4'>
          {product.reviews?.map((review: any, i: number) => (
            <div key={i} className='border-b pb-4'>
              <div className='flex items-center gap-2 mb-1'>
                <div className='flex text-yellow-400 text-sm'>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j}>{j < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <p className='text-sm font-medium'>{review.reviewerName}</p>
              </div>
              <p className='text-sm text-gray-600'>{review.comment}</p>
              <p className='text-xs text-gray-400 mt-1'>
                {new Date(review.date).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// {
// "title": "Red Nail Polish",
// "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
// "category": "beauty",
// "price": 8.99,
// "discountPercentage": 11.44,
// "rating": 4.32,
// "stock": 79,
// "tags": [
// "beauty",
// "nail polish"
// ],
// "brand": "Nail Couture",
// "sku": "BEA-NAI-NAI-005",
// "weight": 8,
// "dimensions": {
// "width": 21.63,
// "height": 16.48,
// "depth": 29.84
// },
// "warrantyInformation": "1 month warranty",
// "shippingInformation": "Ships overnight",
// "availabilityStatus": "In Stock",
// "reviews": [
// {
// "rating": 2,
// "comment": "Poor quality!",
// "date": "2025-04-30T09:41:02.053Z",
// "reviewerName": "Benjamin Wilson",
// "reviewerEmail": "benjamin.wilson@x.dummyjson.com"
// },
// {
// "rating": 5,
// "comment": "Great product!",
// "date": "2025-04-30T09:41:02.053Z",
// "reviewerName": "Liam Smith",
// "reviewerEmail": "liam.smith@x.dummyjson.com"
// },
// {
// "rating": 1,
// "comment": "Very unhappy with my purchase!",
// "date": "2025-04-30T09:41:02.053Z",
// "reviewerName": "Clara Berry",
// "reviewerEmail": "clara.berry@x.dummyjson.com"
// }
// ],
// "returnPolicy": "No return policy",
// "minimumOrderQuantity": 22,
// "meta": {
// "createdAt": "2025-04-30T09:41:02.053Z",
// "updatedAt": "2025-04-30T09:41:02.053Z",
// "barcode": "4063010628104",
// "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
// },
// "images": [
// "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp"
// ],
// "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp"
// }
