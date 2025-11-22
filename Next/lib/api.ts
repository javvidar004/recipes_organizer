import axios from 'axios';
import { Recipe, JWTResponse, IngredientMenu, User, PasswordUpdate, Ingredient } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to clear client-side auth state
export const clearAuth = () => {
    try {
        // remove Authorization header used by axios client
        // @ts-ignore
        if (apiClient && apiClient.defaults && apiClient.defaults.headers) {
            delete apiClient.defaults.headers.common['Authorization'];
        }
        // clear userId cookie
        if (typeof document !== 'undefined') {
            document.cookie = 'userId=; Path=/; Max-Age=0; SameSite=Lax';
        }
        // remove any token stored in localStorage (if used elsewhere)
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('token');
        }
    } catch (e) {
        console.warn('clearAuth failed', e);
    }
};


export const userSignIn = async (
    credentials: { email: string; password: string }
): Promise<JWTResponse> => {
    try {
        const response = await apiClient.post<JWTResponse>('/auth/login', credentials);
        console.log('API Response:', response.data);

        const { token } = response.data;

        // set Authorization header for subsequent requests
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Try to decode token payload (JWT) to extract a user id claim
        const parseJwt = (jwt: string): Record<string, unknown> | null => {
            try {
                const parts = jwt.split('.');
                if (parts.length < 2) return null;
                // base64url decode
                const payload = parts[1]
                    .replace(/-/g, '+')
                    .replace(/_/g, '/');
                // add padding if needed
                const pad = payload.length % 4;
                const padded = pad ? payload + '='.repeat(4 - pad) : payload;
                const json = typeof window !== 'undefined'
                    ? atob(padded)
                    : Buffer.from(padded, 'base64').toString('utf8');
                return JSON.parse(json) as Record<string, unknown>;
            } catch (e) {
                console.warn('Failed to parse JWT payload', e);
                return null;
            }
        };

        const payload = parseJwt(token);
        let userId: string | number | null = null;
        if (payload) {
            // common claim names used by servers: id, userId, sub
            const candidate = payload['userId'] ?? payload['id'] ?? payload['sub'] ?? null;
            if (typeof candidate === 'string' || typeof candidate === 'number') {
                userId = candidate;
            } else if (candidate !== null && typeof candidate === 'object') {
                // fall back to stringifying unexpected object shapes
                try {
                    userId = JSON.stringify(candidate as Record<string, unknown>);
                } catch {
                    userId = null;
                }
            }
        }

        // Save userId as a cookie in the browser only
        if (typeof window !== 'undefined' && userId !== null) {
            try {
                const maxAge = 60 * 60 * 24 * 7; // 7 days
                const secure = window.location.protocol === 'https:' ? '; Secure' : '';
                // samesite=lax to be permissive for navigation-based flows
                document.cookie = `userId=${encodeURIComponent(
                    String(userId)
                )}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
            } catch (e) {
                console.warn('Failed to set userId cookie', e);
            }
        }

        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

/**
 * Fetch meals for a given date for the current user (reads userId from cookie).
 * Returns a simple shape: { breakfast?: { recipeId, recipeName, people }, lunch?:..., dinner?:... }
 */
export const getMealsForDate = async (
    startDate: string,
    endDate: string,
    date: string
): Promise<any> => {
    try {
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const match = document.cookie.match('(?:^|; )userId=([^;]+)');
            if (match && match[1]) userId = decodeURIComponent(match[1]);
        }

        if (!userId) throw new Error('userId cookie not found');

        // POST body with week range and the selected date (frontend expects this contract)
        const res = await fetch(`${API_BASE_URL}/menus/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? ''),
            },
            body: JSON.stringify({ startDate, endDate, date }),
        });

        if (!res.ok) {
            let err = `${res.status} ${res.statusText}`;
            try { const body = await res.json(); err = body?.message || JSON.stringify(body); } catch {}
            throw new Error(err);
        }

        // Some backends may return 204 for no meals
        if (res.status === 204) return {};

        return await res.json();
    } catch (error) {
        console.error('Error fetching meals for date:', error);
        throw error;
    }
};

/**
 * Upsert a meal for the given date and mealType. body: { date, mealType, recipeId, people }
 * Uses PUT and expects no response body (handles 204).
 */
export const upsertMeal = async (date: string, mealType: string, recipeId: number, people = 1): Promise<void> => {
    try {
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const match = document.cookie.match('(?:^|; )userId=([^;]+)');
            if (match && match[1]) userId = decodeURIComponent(match[1]);
        }

        if (!userId) throw new Error('userId cookie not found');

        const payload = { date, mealType, recipeId, people };

        const res = await fetch(`${API_BASE_URL}/menus/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? ''),
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            let err = `${res.status} ${res.statusText}`;
            try { const body = await res.json(); err = body?.message || JSON.stringify(body); } catch {}
            throw new Error(err);
        }

        return;
    } catch (error) {
        console.error('Error upserting meal:', error);
        throw error;
    }
};

/**
 * Upsert multiple recipes for a meal in a single request.
 * payload: { date, mealType, recipes: [{ recipeId, people }, ...] }
 */
export const upsertMealEntries = async (
    date: string,
    mealType: string,
    entries: Array<{ recipeId: number; people?: number }>
): Promise<void> => {
    try {
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const match = document.cookie.match('(?:^|; )userId=([^;]+)');
            if (match && match[1]) userId = decodeURIComponent(match[1]);
        }

        if (!userId) throw new Error('userId cookie not found');

        const payload = { date, mealType, recipes: entries.map(e => ({ recipeId: e.recipeId, people: e.people ?? 1 })) };

        const res = await fetch(`${API_BASE_URL}/menus/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? ''),
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            let err = `${res.status} ${res.statusText}`;
            try { const body = await res.json(); err = body?.message || JSON.stringify(body); } catch {}
            throw new Error(err);
        }

        return;
    } catch (error) {
        console.error('Error upserting meal entries:', error);
        throw error;
    }
};

/**
 * Upsert all meals for a given date in a single request.
 * payload: { date, meals: { breakfast: [{ recipeId, people }], lunch: [...], dinner: [...] } }
 */
export const upsertAllMeals = async (
    start_date_week: string,
    end_date_week: string,
    date: number,
    meals: {
        breakfast?: Array<{ recipeId: number; people?: number }>;
        lunch?: Array<{ recipeId: number; people?: number }>;
        dinner?: Array<{ recipeId: number; people?: number }>;
    }
): Promise<void> => {
    try {
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const match = document.cookie.match('(?:^|; )userId=([^;]+)');
            if (match && match[1]) userId = decodeURIComponent(match[1]);
        }

        if (!userId) throw new Error('userId cookie not found');

    // Include week range so the backend can apply week-scoped logic
    // `date` is the day-of-month integer as requested by backend
    const payload = { start_date_week, end_date_week, date, meals };

        const res = await fetch(`${API_BASE_URL}/menus/recipes/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? ''),
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            let err = `${res.status} ${res.statusText}`;
            try { const body = await res.json(); err = body?.message || JSON.stringify(body); } catch {}
            throw new Error(err);
        }

        return;
    } catch (error) {
        console.error('Error upserting all meals:', error);
        throw error;
    }
};

export const getIngredientsMenu = async (id: number): Promise<IngredientMenu[]> => {
    try {
        const response = await apiClient.get<IngredientMenu[]>(`menus/${id}/shopping-list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredients menu:', error);
        throw error;
    }
};

/**
 * Fetch a weekly shopping list for the current user using a date range.
 * Sends userId (from cookie) and a POST body { from, to } (YYYY-MM-DD).
 */
export const getWeeklyShoppingList = async (from: string, to: string): Promise<IngredientMenu[]> => {
    try {
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const match = document.cookie.match('(?:^|; )userId=([^;]+)');
            if (match && match[1]) userId = decodeURIComponent(match[1]);
        }

        if (!userId) throw new Error('userId cookie not found');

        // Use POST with JSON body { from, to } per updated backend expectation
        const res = await fetch(`${API_BASE_URL}/menus/${userId}/shopping-list?start=${from}&end=${to}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? ''),
            },
        });

        if (!res.ok) {
            let err = `${res.status} ${res.statusText}`;
            try { const body = await res.json(); err = body?.message || JSON.stringify(body); } catch {}
            throw new Error(err);
        }

        if (res.status === 204) return [];

        return await res.json();
    } catch (error) {
        console.error('Error fetching weekly shopping list:', error);
        throw error;
    }
};

export const getRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await apiClient.get<Recipe[]>('/recipes');
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const getIngredientsList = async (): Promise<Ingredient[]> => {
    try {
        const response = await apiClient.get<Ingredient[]>('/ingredients');
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        throw error;
    }
};

export const createRecipe = async (payload: {
    name: string;
    description: string;
    prepTime: number;
    typeId?: number;
    ingredients: Array<{ ingredientId: number; quantity: number; units: string }>;
}): Promise<void> => {
    try {
        await apiClient.post('/recipes', payload);
        return;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
};

export const createIngredient = async (payload: { name: string; calories?: number; cost?: number; }): Promise<any> => {
    try {
        const response = await apiClient.post('/ingredients', payload);
        return response.data;
    } catch (error) {
        console.error('Error creating ingredient:', error);
        throw error;
    }
};

export const getUserData = async (): Promise<User> => {
    try {
        // Try to read userId from cookie (set by userSignIn)
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const match = document.cookie.match('(?:^|; )userId=([^;]+)');
            if (match && match[1]) {
                userId = decodeURIComponent(match[1]);
            }
        }

        if (!userId) {
            throw new Error('userId cookie not found');
        }

        const response = await apiClient.get<User>(`/users/${userId}`);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

export const updatePassword = async ( formdata: PasswordUpdate ): Promise<{ message: string }> => {
try {    
    let userId: string | null = null;
    if (typeof window !== 'undefined') {
        const match = document.cookie.match('(?:^|; )userId=([^;]+)');
        if (match && match[1]) {
            userId = decodeURIComponent(match[1]);
        }
    }

    if (!userId) {
        throw new Error('userId cookie not found');
    }
    const payload = {
        currentPassword: formdata.currentPassword,
        newPassword: formdata.newPassword,
        confirmPassword: formdata.confirmPassword,
    };

    const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? ''),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
    }

    // Some backends return 204 No Content. Handle empty bodies gracefully.
    if (response.status === 204) {
        return { message: response.statusText || 'No Content' };
    }

    try {
        const data = await response.json();
        return data;
    } catch (e) {
        return { message: response.statusText || 'Success' };
    }
    } catch (error) {
    console.error('Error updating password:', error);
    throw error;
    }
};

export const updateUserProfile = async (payload: { firstName?: string; lastName?: string; }): Promise<void> => {
    try {
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const match = document.cookie.match('(?:^|; )userId=([^;]+)');
            if (match && match[1]) {
                userId = decodeURIComponent(match[1]);
            }
        }

        if (!userId) {
            throw new Error('userId cookie not found');
        }

        const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? ''),
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            // Try to parse error body
            let errMsg = `${res.status} ${res.statusText}`;
            try {
                const err = await res.json();
                errMsg = err?.message || JSON.stringify(err);
            } catch {
                // ignore
            }
            throw new Error(errMsg);
        }

        // Success; backend may return 204 No Content
        return;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};