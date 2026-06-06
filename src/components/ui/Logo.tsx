import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Logo() {
    return <>
        <Link href="/">
            <Image
                src="/images/amazon_PNG11.png"
                alt="logo"
                width={110} height={40}
                className=' object-contain'
            />
        </Link>
    </>
    
}
