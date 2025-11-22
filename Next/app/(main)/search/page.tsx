// app/(main)/search/page.tsx
'use client';

import { useState } from 'react';
import { Recipe } from '@/types';
import { useQuery } from '@tanstack/react-query'; 
import { getRecipes } from '@/lib/api';
import SearchBar from '@/components/search/SearchBar';
import RecipeList from '@/components/recipes/RecipeList'; // Reutilizamos el componente de la lista

/**
 * Página de Búsqueda.
 * Permite a los usuarios buscar recetas en la base de datos.
 * Gestiona el estado de la consulta de búsqueda y los resultados filtrados.
 */
export default function SearchPage() {
  // Estado para almacenar los resultados de la búsqueda
  const [results, setResults] = useState<Recipe[]>([]);
  // Estado para saber si se ha realizado una búsqueda
  const [hasSearched, setHasSearched] = useState(false);


  const { 
    data: allRecipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>({
    queryKey: ['allRecipes'],
    queryFn: getRecipes,
  });
  /**
   * Maneja la lógica de la búsqueda.
   * Filtra las recetas mock basadas en el término de búsqueda.
   * @param query - El texto introducido por el usuario.
   */
  const handleSearch = (query: string) => {
    setHasSearched(true);
    if (!query) {
      setResults([]);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filteredResults = (allRecipes ?? []).filter(recipe => 
      recipe.name.toLowerCase().includes(lowercasedQuery) || 
      recipe.description.toLowerCase().includes(lowercasedQuery)
    );

    setResults(filteredResults);
  };

  return (
    <div className="container mx-auto">
      {/* Encabezado de la página */}
      <h1 className="text-3xl font-bold text-dark-background mb-4">
        Buscar Recetas
      </h1>
      <p className="text-gray-600 mb-6">
        Encuentra inspiración para tu próxima comida buscando en nuestra colección de recetas.
      </p>

      {/* Barra de Búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Sección de Resultados */}
      <div className="mt-8">
        {hasSearched ? (
          <RecipeList recipes={results} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Comienza tu búsqueda</h2>
            <p className="text-gray-500 mt-2">Escribe algo en la barra de búsqueda para ver resultados.</p>
          </div>
        )}
      </div>
    </div>
  );
}