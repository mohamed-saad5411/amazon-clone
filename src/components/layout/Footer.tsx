'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-gray-900 relative text-white mt-10'>
      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='bg-gray-300 shadow-sm w-[2rem] h-[2rem] rounded-full absolute top-[-1rem] left-1/2 transform -translate-x-1/2 flex items-center justify-center hover:bg-gray-400 transition-all duration-400 cursor-pointer'
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" h-5 text-gray-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </div>

      {/* Main footer */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 px-10 py-10 text-sm'>
        <div>
          <h3 className='font-bold mb-3'>Get to Know Us</h3>
          <ul className='space-y-2 text-gray-400'>
            <li><Link href="#" className='hover:text-white'>Careers</Link></li>
            <li><Link href="#" className='hover:text-white'>Blog</Link></li>
            <li><Link href="#" className='hover:text-white'>About Amazon</Link></li>
            <li><Link href="#" className='hover:text-white'>Investor Relations</Link></li>
            <li><Link href="#" className='hover:text-white'>Amazon Devices</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='font-bold mb-3'>Make Money with Us</h3>
          <ul className='space-y-2 text-gray-400'>
            <li><Link href="#" className='hover:text-white'>Sell products on Amazon</Link></li>
            <li><Link href="#" className='hover:text-white'>Sell on Amazon Business</Link></li>
            <li><Link href="#" className='hover:text-white'>Sell apps on Amazon</Link></li>
            <li><Link href="#" className='hover:text-white'>Become an Affiliate</Link></li>
            <li><Link href="#" className='hover:text-white'>Advertise Your Products</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='font-bold mb-3'>Amazon Payment Products</h3>
          <ul className='space-y-2 text-gray-400'>
            <li><Link href="#" className='hover:text-white'>Amazon Business Card</Link></li>
            <li><Link href="#" className='hover:text-white'>Shop with Points</Link></li>
            <li><Link href="#" className='hover:text-white'>Reload Your Balance</Link></li>
            <li><Link href="#" className='hover:text-white'>Amazon Currency Converter</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='font-bold mb-3'>Let Us Help You</h3>
          <ul className='space-y-2 text-gray-400'>
            <li><Link href="#" className='hover:text-white'>Amazon and COVID-19</Link></li>
            <li><Link href="#" className='hover:text-white'>Your Account</Link></li>
            <li><Link href="#" className='hover:text-white'>Your Orders</Link></li>
            <li><Link href="#" className='hover:text-white'>Shipping Rates & Policies</Link></li>
            <li><Link href="#" className='hover:text-white'>Returns & Replacements</Link></li>
            <li><Link href="#" className='hover:text-white'>Manage Your Content</Link></li>
            <li><Link href="#" className='hover:text-white'>Help</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-700' />

      {/* Bottom footer */}
      <div className='flex flex-col md:flex-row items-center justify-center gap-4 py-6 text-xs text-gray-400'>
        <Link href="/" className='text-white font-bold text-lg'>amazon</Link>
        <div className='flex gap-4'>
          <Link href="#" className='hover:text-white'>Conditions of Use</Link>
          <Link href="#" className='hover:text-white'>Privacy Notice</Link>
          <Link href="#" className='hover:text-white'>Your Ads Privacy Choices</Link>
        </div>
        <p>© 2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  )
}