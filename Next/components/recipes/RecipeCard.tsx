// components/recipes/RecipeCard.tsx
import { Recipe } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface RecipeCardProps {
  recipe: Recipe;
}

/**
 * Tarjeta individual para mostrar un resumen de una receta.
 * Incluye el nombre, descripción y botones de acción para editar o eliminar.
 */
const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-background truncate">{recipe.name}</h3>
        <p className="text-gray-600 mt-2 h-20 overflow-hidden text-ellipsis">
          {recipe.description}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;