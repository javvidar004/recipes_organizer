// app/page.tsx
import Link from 'next/link';
import { BookOpenIcon, ShoppingCartIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import foodBackground from './food-background.png';

/**
 * Landing Page (Home) para usuarios no autenticados.
 * Presenta la aplicación y sus características principales, con llamadas a la acción
 * para registrarse o iniciar sesión.
 */
export default function HomePage() {
  return (
    <main className="bg-background">
      {/* Sección Principal (Hero) */}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center text-white bg-dark-background overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${foodBackground})` }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Organiza tus comidas, simplifica tus compras.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Tu gestor de recetas personal para planificar menús semanales, crear listas de súper automáticas y redescubrir el placer de cocinar.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
            >
              Comienza Ahora
            </Link>
            <Link 
              href="/signin" 
              className="w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
            >
              Ya tengo una cuenta
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de Características */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-dark-background">Todo lo que necesitas en un solo lugar</h2>
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
            Desde la planificación de tus menús hasta la lista de compras, tenemos todo cubierto.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Característica 1: Planifica Menús */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4">
                <CalendarDaysIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-dark-background">Planifica tus Menús</h3>
              <p className="mt-2 text-gray-500">
                Usa nuestro calendario intuitivo para asignar recetas a cada día de la semana y para cada comida.
              </p>
            </div>

            {/* Característica 2: Lista de Súper */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary text-white mb-4">
                <ShoppingCartIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-dark-background">Lista de Súper Inteligente</h3>
              <p className="mt-2 text-gray-500">
                Genera automáticamente tu lista de compras basada en los menús que planificaste.
              </p>
            </div>

            {/* Característica 3: Administra Recetas */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mb-4">
                <BookOpenIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-dark-background">Administra tus Recetas</h3>
              <p className="mt-2 text-gray-500">
                Guarda tus recetas favoritas, agrega las tuyas y busca nuevas ideas para inspirarte.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}