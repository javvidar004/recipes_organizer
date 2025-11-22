// types/index.ts

/**
 * Represents a user of the application.
 * Based on the Users table in the design document.
 */
export interface User {
  id: number;
  email: string;
  uname: string;
  ulastName: string;
}

export interface JWTResponse {
  token: string;
}

/**
 * Represents a single recipe.
 * Based on the Recipies table.
 */
export interface Recipe {
  id: number;
  UserIdAdd: number;
  name: string;
  description: string;
  prepTime: number; // e.g., 30
  publicRecipe: boolean;
  ingredients: Ingredient[];
}


export interface Recipes {
  Recipe: Recipe[];
}
/**
 * Represents an ingredient within a recipe.
 * Based on the Ingredient_Recipe and Ingredients tables.
 */
export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  units: 'g' | 'kg' | 'ml' | 'L' | 'pcs';
}

/**
 * Represents a user's profile statistics.
 */
export interface UserStats {
  recipesPublished: number;
  favoriteRecipes: number;
  savedRecipes: number;
}

export interface IngredientMenu {
  name: string;
  cantidad: number;
  unidades: 'g' | 'kg' | 'ml' | 'L' | 'unit';
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}