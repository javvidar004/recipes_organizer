// lib/mockData.ts
import { User, UserStats, Recipe } from '@/types';

// Mock user data
export const mockUser: User = {
  id: 1,
  email: 'javier@example.com',
  uname: 'Javier',
  ulastName: 'De Alba',
};

// Mock user statistics
export const mockUserStats: UserStats = {
  recipesPublished: 12,
  favoriteRecipes: 8,
  savedRecipes: 15,
};

// Mock recipe data
export const mockRecipes: Recipe[] = [
  {
    id: 101,
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with eggs, cheese, and pancetta.',
    ingredients: [
      { id: 1, name: 'Spaghetti', quantity: 400, units: 'g' },
      { id: 2, name: 'Pancetta', quantity: 150, units: 'g' },
      { id: 3, name: 'Eggs', quantity: 4, units: 'pcs' },
      { id: 4, name: 'Parmesan Cheese', quantity: 100, units: 'g' },
    ],
    prepTime: 25,
    UserIdAdd: 1,
    publicRecipe: true,
  },
  {
    id: 102,
    name: 'Chicken Tacos',
    description: 'Easy and delicious chicken tacos with fresh salsa.',
    ingredients: [
      { id: 5, name: 'Chicken Breast', quantity: 500, units: 'g' },
      { id: 6, name: 'Tortillas', quantity: 8, units: 'pcs' },
      { id: 7, name: 'Tomato', quantity: 2, units: 'pcs' },
      { id: 8, name: 'Onion', quantity: 1, units: 'pcs' },
    ],
    prepTime: 30,
    UserIdAdd: 2,
    publicRecipe: true,
  },
  // Add more recipes as needed
];

// Mock user's favorite recipes
export const mockFavoriteRecipes = mockRecipes.slice(0, 1);