'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SignIn() {
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
      setError('Invalid email or password')
    } else {
      window.location.href = searchParams.get('callbackUrl') || '/'
    }
  }

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: searchParams.get('callbackUrl') || '/' })
  }

  return (
    <div className="flex flex-col items-center justify-center grow">
      <div className="w-full md:w-1/4 p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 mb-2">
          <img src="/SmallA2.svg" alt="logo" className="w-[40px]" />
          <div className="text-2xl font-bold">Sign in to your account</div>
          <div className="text-sm mx-2 text-center text-gray-500">Sign in to start your coding journey and compete in challenges.</div>
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
          <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Sign In</button>
          <div className="flex items-center justify-center w-full my-2">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          <button 
            onClick={handleGitHubSignIn} 
            type="button" 
            className="bg-gray-800 text-white p-2 rounded-md w-full flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  )
}