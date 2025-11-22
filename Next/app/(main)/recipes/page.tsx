"use client";

// app/(main)/recipes/page.tsx
import Link from 'next/link';
import { Recipe } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import RecipeList from '@/components/recipes/RecipeList';
import { getRecipes } from '@/lib/api';

/**
 * Página de "Recetas".
 * Muestra las opciones principales: agregar nueva receta y buscar.
 * También renderiza la lista de las recetas creadas por el usuario.
 */
export default function RecipesPage() {
  const { 
    data: allRecipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>({
    queryKey: ['allRecipes'],
    queryFn: getRecipes,
  });

  return (
    <div className="container mx-auto">
      {/* Encabezado y Acciones Principales */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-dark-background">
          Mis Recetas
        </h1>
        <div className="flex items-center gap-2">
          <Link 
            href="/recipes/new"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-md"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Nueva Receta</span>
          </Link>
          <Link 
            href="/search"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors shadow-md"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Buscar</span>
          </Link>
        </div>
      </div>

      {/* Lista de Recetas del Usuario */}
      <RecipeList recipes={allRecipes ?? []} />
    </div>
  );
}