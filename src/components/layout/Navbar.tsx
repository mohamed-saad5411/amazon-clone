'use client'
import React, { useEffect, useState } from 'react'
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectItems } from '@/store/slices/cartSlice';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useCartUser } from '@/hooks/useCartUser';



export default function Navbar() {
    // const cartItems = useSelector(selectItems)
    const [user, setUser] = useState<any>(null)
    const [dropDown, setDropDown] = useState(false)
    const supabase = createClient()
    const router = useRouter()
    const { cartItems, userId } = useCartUser()
    const categories = [
        "smartphones",
        "laptops",
        "beauty",
        "furniture",
        "sports-accessories",
        "groceries",
        "skin-care",
        "fragrances",
        "home-decoration",
        "kitchen-accessories",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mobile-accessories",
        "motorcycle",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches"
    ]
    const navitems = categories.map((category) => {
        return <Link key={category} href={`/categories/${category}`} className=' hover:text-black transition-all duration-400'>
            {category.split('-').join(' ')}
        </Link>
    })


    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => listener.subscription.unsubscribe()
    }, [])


    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
    }


    return <>
        <nav className='fixed z-50 top-0 left-0 right-0'>
            {/* top navbar */}
            {/* large screen navbar */}
            <div className="sm:flex items-center hidden justify-between p-4 bg-gray-900">
                <Logo />
                <SearchBar />
                <div className='flex items-center mx-6 mt-4 space-x-6 text-xs text-white'>
                    {/* <Link href="/login" className='cursor-pointer hover:text-gray-300'>
                        <p>Hello, mohamed</p>
                        <p>Account, Lists</p>
                    </Link> */}

                    {user ? <div onClick={handleLogout} className='cursor-pointer hover:text-gray-300'>
                        <p>Hello, {user.user_metadata.name}</p>
                        <p>sign out</p>
                    </div>
                        :
                        <Link href="/login" className='cursor-pointer hover:text-gray-300'>
                            <p>Hello, Guest</p>
                            <p>Sign In</p>
                        </Link>
                    }

                    <Link href="/orders" className='cursor-pointer hover:text-gray-300'>
                        <p>Returns</p>
                        <p>& Orders</p>
                    </Link>
                    {user ?
                        <Link href="/cart" className='relative cursor-pointer hover:text-gray-300'>
                            <div className='absolute left-4 bottom-3 w-[1.2rem] flex hover:bg-yellow-600 justify-center items-center rounded-full h-[1.4rem] bg-yellow-500 font-bold '>
                                <span className='font-bold '>{cartItems ? cartItems.length : 0}</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                        </Link>

                        : ''}
                </div>
            </div>
            {/* responsive */}
            <div className="flex items-center sm:hidden md:flex-row flex-col justify-between p-4 bg-gray-900">
                <div className='flex items-center h-15 justify-between w-full md:w-auto'>
                    <Logo />
                    <SearchBar />
                </div>
                <div className='flex items-center justify-evenly w-full mx-6 mt-4 space-x-6 text-xs text-white'>
                    {/* <Link href="/login" className='cursor-pointer hover:text-gray-300'>
                        <p>Hello, mohamed</p>
                        <p>Account, Lists</p>
                    </Link> */}

                    {user ? <div onClick={handleLogout} className='cursor-pointer hover:text-gray-300'>
                        <p>Hello, {user.user_metadata.name}</p>
                        <p>sign out</p>
                    </div>
                        :
                        <Link href="/login" className='cursor-pointer hover:text-gray-300'>
                            <p>Hello, Guest</p>
                            <p>Sign In</p>
                        </Link>
                    }

                    <Link href="/orders" className='cursor-pointer hover:text-gray-300'>
                        <p>Returns</p>
                        <p>& Orders</p>
                    </Link>
                    {user ?
                        <Link href="/cart" className='relative cursor-pointer hover:text-gray-300'>
                            <div className='absolute left-4 bottom-3 w-[1.2rem] flex hover:bg-yellow-600 justify-center items-center rounded-full h-[1.4rem] bg-yellow-500 font-bold '>
                                <span className='font-bold '>{cartItems ? cartItems.length : 0}</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                        </Link>

                        : ''}
                </div>
            </div>

            {/* bottom navbar */}
            <div className="flex items-center p-1 space-x-3 text-xs text-white bg-gray-700 h-7">

                {/* dropdown */}
                <div className="relative md:text-sm text-[10px] inline-block text-left " onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                    <button className="inline-flex justify-center items-center  rounded-md  transition-all duration-400">
                        All Categories
                        <svg className="-mr-1 md:h-5 h-4 md:w-5 w-4 text-gray-400 transition-all duration-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {dropDown && (
                        <div className="absolute left-0 z-10 mt-1 w-48 rounded-sm bg-white shadow-lg">
                            <div role="none" className='max-h-64 overflow-y-auto'>
                                {navitems.map((item, index) => (
                                    <div key={index} className="block px-2 py-1 text-sm text-black hover:bg-gray-100">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                <div className='items-center text-[12px] space-x-3 md:hidden'>
                    {navitems.slice(0, 4)}
                </div>
                <div className='items-center hidden space-x-3 md:flex lg:hidden'>
                    {navitems.slice(0, 7)}
                </div>
                <div className='items-center space-x-3 hidden lg:flex'>
                    {navitems.slice(0, 15)}
                </div>

            </div>

        </nav>

    </>
}



