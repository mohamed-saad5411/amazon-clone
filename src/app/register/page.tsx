'use client'
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const supabase = createClient()
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/login')
    }
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    })
  }

  return <>
    <div className="flex min-h-full text-black flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium">User name</label>
            <div className="mt-2">
              <input
                id="username" name="username" type="text" required
                value={username} onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium">Email address</label>
            <div className="mt-2">
              <input
                id="email" name="email" type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium">Password</label>
            <div className="mt-2">
              <input
                id="password" name="password" type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400">
            Create account
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Have an account?{' '}
          <Link href="/login" className="font-semibold">Sign in</Link>
        </p>

        <button onClick={handleGoogleLogin} className="mt-4 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400">
          Google
        </button>
      </div>
    </div>
  </>

}

// https://clsybffoegudziubobxa.supabase.co/auth/v1/callback