'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false,
    })

    if (result?.error) {
      setError('Sign up failed. Please try again.')
    } else {
      window.location.href = searchParams.get('callbackUrl') || '/'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center grow">
      <div className="w-full md:w-1/4 p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 mb-2">
          <img src="/SmallA2.svg" alt="logo" className="w-[40px]" />
          <div className="text-2xl font-bold">Create an account</div>
          <div className="text-sm mx-2 text-center text-gray-500">Sign up to start your coding journey and compete in challenges.</div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <div className="w-full flex items-center gap-[1px] border-[0.5px] border-gray-300 rounded-md p-2">
            <img src="/email.svg" alt="email" className="w-[17px] h-[16px] m-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@gmail.com"
              className="w-full bg-transparent focus:outline-none rounded-md"
              required
            />
          </div>
          <div className="w-full flex items-center justify-center gap-[1px] border-[0.5px] border-gray-300 rounded-md p-2">
            <img src="/lock.svg" alt="lock" className="w-[17px] h-[16px] m-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 m-2">{error}</p>}
          <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Sign Up</button>
        </div>
      </div>
    </div>
  )
}