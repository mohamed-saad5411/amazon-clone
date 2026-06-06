'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductImageCarousel({ images, thumbnail }: { images: string[], thumbnail: string }) {
    const allImages = images?.length > 0 ? images : [thumbnail]
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaRef] = useEmblaCarousel()

    return (
        <div className='flex flex-col gap-3'>
            {/* Main Image */}
            <div className='relative h-80 w-full border rounded-md overflow-hidden'>
                <Image
                    src={allImages[selectedIndex]}
                    alt={`product-image-${selectedIndex}`}
                    fill
                    className='object-contain'
                />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className='flex gap-2 flex-wrap'>
                    {allImages.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`relative w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer transition-all ${selectedIndex === i ? 'border-yellow-500' : 'border-gray-200'}`}
                        >
                            <Image src={img} alt={`thumb-${i}`} fill className='object-contain' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}