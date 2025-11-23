// app/(auth)/signup/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Página de registro (Sign Up).
 * Presenta un formulario para que los nuevos usuarios creen una cuenta.
 * Utiliza el AuthLayout para un diseño centrado y limpio.
 */
export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        firstName: form.get('firstName') as string | null,
        lastName: form.get('lastName') as string | null,
        email: form.get('email') as string | null,
        password: form.get('password') as string | null,
      };

      // Validate minimal fields client-side
      if (!payload.email || !payload.password || !payload.firstName) {
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';

      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Registration succeeded — navigate to sign in or dashboard
        router.push('/signin');
      } else {
        // Try to parse error from body
        let errMsg = 'Registration failed';
        try {
          const data = await res.json();
          errMsg = data?.message || JSON.stringify(data);
        } catch {
          // ignore parse errors
          errMsg = `${res.status} ${res.statusText}`;
        }
        setError(errMsg);
      }
    } catch (err) {
      console.error('Signup error', err);
      setError((err as Error).message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-center text-dark-background">
        Create an Account
      </h2>

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          {/* Campo de Nombre */}
          <div className="w-full">
            <label htmlFor="firstName" className="sr-only">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
              placeholder="First Name"
            />
          </div>
          {/* Campo de Apellido */}
          <div className="w-full">
            <label htmlFor="lastName" className="sr-only">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Campo de Email */}
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            placeholder="Email address"
          />
        </div>

        {/* Campo de Contraseña */}
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            placeholder="Password"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-transform transform hover:scale-105 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {error && (
          <p className="text-sm text-red-600 text-center" role="alert">
            {error}
          </p>
        )}

        {/* Enlace para iniciar sesión */}
        <div className="text-sm text-center pt-2">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}