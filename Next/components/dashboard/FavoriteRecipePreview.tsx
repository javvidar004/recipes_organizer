// components/dashboard/FavoriteRecipesPreview.tsx
import Link from 'next/link';
import { Recipe } from '@/types';
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid';

interface FavoriteRecipesPreviewProps {
  recipes: Recipe[];
}

const FavoriteRecipesPreview = ({ recipes }: FavoriteRecipesPreviewProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-dark-background">Tus Favoritos</h3>
        <Link href="/favorites" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          Ver todos <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-3">
        {recipes.slice(0, 3).map(recipe => ( // Muestra solo los primeros 3
          <div key={recipe.id} className="p-3 bg-gray-50 rounded-md flex items-center gap-4 hover:bg-gray-100 transition-colors">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="font-medium text-gray-700">{recipe.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipesPreview;