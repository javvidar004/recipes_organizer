// app/(main)/shopping-list/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getIngredientsMenu, getWeeklyShoppingList } from '@/lib/api';
import { Ingredient } from '@/types';
import WeekSelector from '@/components/shopping-list/WeekSelector';
import IngredientList from '@/components/shopping-list/IngredientList';

/**
 * Página de "Lista de Súper".
 * Permite a los usuarios generar una lista de compras consolidada
 * basada en las recetas planificadas para una semana específica.
 */
export default function ShoppingListPage() {
  // Estado para almacenar la lista de ingredientes generada.
  const [shoppingList, setShoppingList] = useState<Ingredient[] | null>(null);
  // Estado para saber si la lista ha sido generada.
  const [isGenerated, setIsGenerated] = useState(false);
  const [weekStart, setWeekStart] = useState<string | null>(null); // YYYY-MM-DD
  const [weekEnd, setWeekEnd] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(false);

  const {
    data: ingredientsMenu,
    isLoading,
    isError,
  } = useQuery<any[]>({
    queryKey: ['ingredientsMenu'],
    queryFn: () => getIngredientsMenu(1), // kept for backwards compatibility / example
  });

  /**
   * Simula la generación de la lista de compras.
   * En una aplicación real, aquí se haría una llamada a la API.
   * Consolida y suma los ingredientes de las recetas mock.
   */
  const handleGenerateList = async () => {
    if (!weekStart || !weekEnd) {
      alert('Please select a week first');
      return;
    }

    try {
      setLoadingList(true);
      const list = await getWeeklyShoppingList(weekStart, weekEnd);
      // Map backend IngredientMenu -> Ingredient expected by IngredientList
      const mapped: Ingredient[] = (list || []).map((it, idx) => ({
        id: idx,
        name: it.name,
        quantity: it.cantidad,
        units: (it.unidades === 'unit' ? 'pcs' : it.unidades) as Ingredient['units'],
      }));
      setShoppingList(mapped);
      setIsGenerated(true);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Failed to generate shopping list');
    } finally {
      setLoadingList(false);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Encabezado y Selector de Semana */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-dark-background">Lista de Súper</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Selecciona una semana y genera una lista consolidada con todos los ingredientes que necesitarás.
        </p>
      </div>

      {/* Selector de Semana y Botón de Acción */}
      <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <WeekSelector onChange={(from, to) => { setWeekStart(from); setWeekEnd(to); }} />
        <button
          onClick={handleGenerateList}
          disabled={loadingList}
          className="w-full mt-4 py-3 px-4 bg-secondary text-white font-bold rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:opacity-60"
        >
          {loadingList ? 'Generating...' : 'Generar Lista de la Semana'}
        </button>
      </div>

      {/* Visualización de la Lista de Ingredientes */}
      <div className="mt-8">
        {isGenerated ? (
          <IngredientList ingredients={shoppingList || []} />
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Tu lista de súper aparecerá aquí</h2>
            <p className="text-gray-500 mt-2">Selecciona una semana y haz clic en &quot;Generar Lista&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
}