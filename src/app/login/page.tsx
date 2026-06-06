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
import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()
    const searchParams = useSearchParams()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            const redirectTo = searchParams.get('redirectTo') || '/'
            router.push(redirectTo)
        }
    }

    async function handleGoogleLogin() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/` }
        })
    }

    return (
        <div className="flex min-h-full text-black flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email" name="email" type="email" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password" name="password" type="password" required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Not a member?{' '}
                    <Link href="/register" className="font-semibold">Sign up</Link>
                </p>

                <div className="relative my-4 text-center text-sm text-gray-400">
                    <span className="relative z-10 bg-white px-2">Or continue with</span>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50"
                >
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
                        <path d="M6.3 14.7l7 5.1C15.2 16 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.6 0-14.2 4.1-17.7 10.2-.1.2-.1.3 0 .5z" fill="#FF3D00"/>
                        <path d="M24 45c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.5C29.7 35.9 27 37 24 37c-5.8 0-10.6-3.9-12.3-9.2l-7 5.4C8 39.1 15.4 45 24 45z" fill="#4CAF50"/>
                        <path d="M44.5 20H24v8.5h11.8c-.9 2.6-2.7 4.8-5 6.3l6.6 5.5C41.6 37.2 45 31.1 45 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
    )
}