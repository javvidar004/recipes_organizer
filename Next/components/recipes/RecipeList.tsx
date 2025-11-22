// components/recipes/RecipeList.tsx
import { Recipe } from '@/types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
}

/**
 * Muestra una lista de recetas en formato de cuadrícula.
 * Si no hay recetas, muestra un mensaje contextual indicándolo.
 * Este componente es reutilizado en /recipes y /search.
 */
const RecipeList = ({ recipes }: RecipeListProps) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">No se encontraron recetas</h2>
        <p className="text-gray-500 mt-2">Intenta con otro término de búsqueda o agrega una nueva receta.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        // Aquí podrías usar una tarjeta diferente para los resultados si quisieras,
        // por ejemplo, una que no tenga los botones de "Editar" y "Borrar".
        // Por ahora, reutilizamos la misma.
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;