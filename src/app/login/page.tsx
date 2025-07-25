'use client';

import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleCredentialsLogin = async () => {
    await signIn('credentials', {
      email: username,
      password,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f7ec]">
      <div className="bg-[#f6f7ec] border border-[#392514] rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#2b2b2b]">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-[#392514] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a3916e]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-[#392514] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a3916e]"
        />

        <button
          onClick={handleCredentialsLogin}
          className="w-full bg-[#4b3b2a] text-white py-2 rounded-md hover:bg-[#3c2f23] transition"
        >
          Login
        </button>

        <div className="my-4 text-center text-sm text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-[#392514] py-2 rounded-md hover:bg-gray-100 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm">Login with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-[#4b3b2a] underline hover:text-[#3c2f23]">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
