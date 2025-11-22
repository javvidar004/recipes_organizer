// components/dashboard/QuickActions.tsx
import Link from 'next/link';
import { CalendarDaysIcon, PlusCircleIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Link href="/menus" className="p-8 bg-primary text-white rounded-lg shadow-lg hover:bg-blue-500 transition-colors flex items-center gap-6">
        <CalendarDaysIcon className="h-10 w-10" />
        <div>
          <h2 className="font-bold text-2xl">Planificar Menú</h2>
          <p className="text-base opacity-90">Organiza tus comidas de la semana.</p>
        </div>
      </Link>

      <Link href="/recipes/new" className="p-8 bg-secondary text-white rounded-lg shadow-lg hover:bg-opacity-90 transition-colors flex items-center gap-6">
        <PlusCircleIcon className="h-10 w-10" />
        <div>
          <h2 className="font-bold text-2xl">Agregar Receta</h2>
          <p className="text-base opacity-90">Añade una nueva creación a tu libro.</p>
        </div>
      </Link>

      <Link href="/search" className="p-8 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors flex items-center gap-6">
        <MagnifyingGlassIcon className="h-10 w-10" />
        <div>
          <h2 className="font-bold text-2xl">Buscar Recetas</h2>
          <p className="text-base opacity-90">Encuentra recetas por ingredientes o nombre.</p>
        </div>
      </Link>

      <Link href="/shopping-list" className="p-8 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition-colors flex items-center gap-6">
        <ShoppingCartIcon className="h-10 w-10" />
        <div>
          <h2 className="font-bold text-2xl">Ver Lista de Súper</h2>
          <p className="text-base opacity-90">Ver y generar tu lista de compras semanal.</p>
        </div>
      </Link>
    </div>
  );
};

export default QuickActions;