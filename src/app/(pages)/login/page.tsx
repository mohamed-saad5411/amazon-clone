// 'use client'
// import Link from "next/link";
// import { useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { useRouter } from "next/navigation";



// export default function login() {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState('')
//     const supabase = createClient()
//     const router = useRouter()

//     async function handleLogin(e: React.FormEvent) {
//         e.preventDefault()
//         const { error } = await supabase.auth.signInWithPassword({ email, password })
//         if (error) {
//             setError(error.message)
//         } else {
//             router.push('/')
//         }
//     }

//     async function handleGoogleLogin() {
//         await supabase.auth.signInWithOAuth({
//             provider: 'google',
//             options: { redirectTo: `${window.location.origin}/` }
//         })
//     }


//     return <>
//         {/* <div className="flex min-h-full text-black flex-col justify-center px-6 py-12 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                 <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">Sign in to your account</h2>
//             </div>

//             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

//                 <form action="#" method="POST" className="space-y-6">
//                     <div>
//                         <label htmlFor="email" className="block text-sm/6 font-medium ">
//                             Email address
//                         </label>
//                         <div className="mt-2">
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 required
//                                 autoComplete="email"
//                                 className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <div className="flex items-center justify-between">
//                             <label htmlFor="password" className="block text-sm/6 font-medium ">
//                                 Password
//                             </label>
//                             <div className="text-sm">
//                                 <a href="#" className="font-semibold">
//                                     Forgot password?
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="mt-2">
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 required
//                                 autoComplete="current-password"
//                                 className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <button
//                             type="submit"
//                             className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//                         >
//                             Sign in
//                         </button>
//                     </div>
//                 </form>

//                 <p className="mt-1 text-center text-sm ">
//                     Not a member?{' '}
//                     <Link href="/register" className="font-semibold ">
//                         Sign up
//                     </Link>
//                 </p>

//                 <div>
//                     <div className=" relative w-full text-center mt-8 mb-4">
//                         <span className=" after:content-[''] after:w-[70px] after:h-[1px] after:bg-gray-500 after:absolute after:top-1/2 after:left-1/8 after:-translate-y-1/2   before:content-[''] before:w-[70px] before:h-[1px] before:bg-gray-500 before:absolute before:top-1/2 before:right-1/8 before:translate-y-1/2"></span>
//                         <p className="">Or continue with</p>
//                     </div>
//                     <button
//                         type="submit"
//                         className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//                     >
//                         Google
//                     </button>
//                 </div>
//             </div>

//         </div> */}

//         <div className="flex min-h-full text-black flex-col justify-center px-6 py-12 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                 <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
//             </div>

//             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//                 <form onSubmit={handleLogin} className="space-y-6">
//                     <div>
//                         <label htmlFor="email" className="block text-sm/6 font-medium">Email address</label>
//                         <div className="mt-2">
//                             <input
//                                 id="email" name="email" type="email" required
//                                 value={email} onChange={(e) => setEmail(e.target.value)}
//                                 className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor="password" className="block text-sm/6 font-medium">Password</label>
//                         <div className="mt-2">
//                             <input
//                                 id="password" name="password" type="password" required
//                                 value={password} onChange={(e) => setPassword(e.target.value)}
//                                 className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                             />
//                         </div>
//                     </div>

//                     <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400">
//                         Sign in
//                     </button>
//                 </form>

//                 <p className="mt-4 text-center text-sm">
//                     Not a member?{' '}
//                     <Link href="/register" className="font-semibold">Sign up</Link>
//                 </p>

//                 <button onClick={handleGoogleLogin} className="mt-4 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400">
//                     Google
//                 </button>
//             </div>
//         </div>
//     </>

// }


'use client'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            window.location.href = '/'
        }
    }

    async function handleGoogle() {
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/` }
        })
    }

    return (
        <div className='flex min-h-screen flex-col justify-center px-6 py-12'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='text-center text-2xl font-bold'>Sign in</h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
                {error && <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>}

                <form onSubmit={handleLogin} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Email</label>
                        <input
                            type='email' required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-yellow-500'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Password</label>
                        <input
                            type='password' required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-yellow-500'
                        />
                    </div>
                    <button type='submit' disabled={loading}
                        className='w-full rounded-md bg-yellow-500 py-2 text-sm font-bold hover:bg-yellow-400 disabled:opacity-50'>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className='mt-4 text-center text-sm'>
                    No account? <Link href='/register' className='font-bold text-yellow-600'>Register</Link>
                </p>

                <div className='relative my-4'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300' />
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='bg-white px-2 text-gray-500'>Or</span>
                    </div>
                </div>

                <button onClick={handleGoogle}
                    className='w-full rounded-md border border-gray-300 py-2 text-sm font-bold hover:bg-gray-50'>
                    Continue with Google
                </button>
            </div>
        </div>
    )
}