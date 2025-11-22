// app/(auth)/forgot-password/page.tsx
import Link from 'next/link';

/**
 * Página de "Olvidé mi contraseña".
 * Permite a los usuarios ingresar su correo electrónico para recibir
 * un enlace y restablecer su contraseña.
 */
export default function ForgotPasswordPage() {
  return (
    <>
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-center text-dark-background">
        Reset Your Password
      </h2>
      
      {/* Texto de instrucción */}
      <p className="text-center text-gray-600 mt-2">
        Enter your email address and we will send you a link to reset your password.
      </p>

      {/* Formulario */}
      <form className="mt-8 space-y-6">
        {/* Campo de Email */}
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
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

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-transform transform hover:scale-105"
        >
          Send Reset Link
        </button>

        {/* Enlace para volver a iniciar sesión */}
        <div className="text-sm text-center pt-2">
          <Link href="/signin" className="font-medium text-primary hover:underline">
            &larr; Back to Log in
          </Link>
        </div>
      </form>
    </>
  );
}