// components/menus/MealPlanner.tsx
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { getRecipes, getMealsForDate, upsertAllMeals } from '@/lib/api';
import { Recipe } from '@/types';

// Definimos las props
interface MealPlannerProps {
  date: Date;
}

type MealEntry = {
  recipeId?: number;
  recipeName?: string;
  people?: number;
};

const MealPlanner = ({ date }: MealPlannerProps) => {
  const [meals, setMeals] = useState<{ breakfast?: MealEntry[]; lunch?: MealEntry[]; dinner?: MealEntry[] }>({});
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<{ [k: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  // format a Date to local YYYY-MM-DD to avoid UTC shifts from toISOString
  const formatLocalDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  };

  const dateStr = formatLocalDate(date); // YYYY-MM-DD (local)

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // compute week start (Monday) and end (Sunday) in YYYY-MM-DD for the requested date
        const tmpLoad = new Date(date);
        const dayLoad = tmpLoad.getDay();
        const diffToMondayLoad = (dayLoad + 6) % 7;
        const startLoad = new Date(tmpLoad);
        startLoad.setDate(tmpLoad.getDate() - diffToMondayLoad);
        startLoad.setHours(0, 0, 0, 0);
        const endLoad = new Date(startLoad);
        endLoad.setDate(startLoad.getDate() + 6);
        const startISOLoad = formatLocalDate(startLoad);
        const endISOLoad = formatLocalDate(endLoad);

        const [allRecipes, mealsForDate] = await Promise.all([
          getRecipes(),
          getMealsForDate(startISOLoad, endISOLoad, dateStr),
        ]);
        if (!mounted) return;
        setRecipes(allRecipes || []);

        // normalize mealsForDate shape to arrays of entries and ensure at least one entry per meal
        const normalize = (slot: any) => {
          if (!slot) return [{ recipeId: undefined, recipeName: undefined, people: 1 }];
          if (Array.isArray(slot)) return slot.map((s: any) => ({ recipeId: s.recipeId, recipeName: s.recipeName, people: s.people ?? 1 }));
          return [{ recipeId: slot.recipeId, recipeName: slot.recipeName, people: slot.people ?? 1 }];
        };

        setMeals({
          breakfast: normalize(mealsForDate?.breakfast),
          lunch: normalize(mealsForDate?.lunch),
          dinner: normalize(mealsForDate?.dinner),
        });
      } catch (e: any) {
        console.error(e);
        setError(e?.message || 'Failed to load meals');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [dateStr]);

  const addEntry = (mealType: string) => {
    setMeals(prev => {
      const existing = prev[mealType as keyof typeof prev] ?? [];
      return { ...prev, [mealType]: [...existing, { recipeId: undefined, recipeName: undefined, people: 1 }] };
    });
  };

  const updateEntry = (mealType: string, index: number, patch: Partial<MealEntry>) => {
    setMeals(prev => {
      const list = [...(prev[mealType as keyof typeof prev] ?? [])];
      list[index] = { ...list[index], ...patch };
      return { ...prev, [mealType]: list };
    });
  };

  const removeEntry = (mealType: string, index: number) => {
    setMeals(prev => {
      const list = [...(prev[mealType as keyof typeof prev] ?? [])];
      if (list.length <= 1) return prev; // ensure at least one
      list.splice(index, 1);
      return { ...prev, [mealType]: list };
    });
  };

  

  const handleSaveAll = async () => {
    setSaving((s) => ({ ...s, all: true }));
    try {
      const build = (list?: MealEntry[]) => (list ?? []).filter(e => e.recipeId).map(e => ({ recipeId: e.recipeId as number, people: e.people ?? 1 }));
      const payload = {
        breakfast: build(meals.breakfast),
        lunch: build(meals.lunch),
        dinner: build(meals.dinner),
      };

      // If nothing selected anywhere, warn
      if (![payload.breakfast, payload.lunch, payload.dinner].some(arr => arr && arr.length > 0)) {
        alert('Please select at least one recipe before saving');
        setSaving((s) => ({ ...s, all: false }));
        return;
      }

  // compute week start (Monday) and end (Sunday) in YYYY-MM-DD
  const tmp = new Date(date);
  const day = tmp.getDay(); // 0 (Sun) .. 6 (Sat)
  const diffToMonday = (day + 6) % 7;
  const start = new Date(tmp);
  start.setDate(tmp.getDate() - diffToMonday);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  const startISO = formatLocalDate(start);
  const endISO = formatLocalDate(end);

  // send day-of-month integer as `date` per backend requirement
  const dayOfMonth = date.getDate();
  await upsertAllMeals(startISO, endISO, dayOfMonth, payload);

      // refresh
  const updated = await getMealsForDate(startISO, endISO, dateStr);
      const normalize = (slot: any) => {
        if (!slot) return [{ recipeId: undefined, recipeName: undefined, people: 1 }];
        if (Array.isArray(slot)) return slot.map((s: any) => ({ recipeId: s.recipeId, recipeName: s.recipeName, people: s.people ?? 1 }));
        return [{ recipeId: slot.recipeId, recipeName: slot.recipeName, people: slot.people ?? 1 }];
      };
      setMeals({
        breakfast: normalize(updated?.breakfast),
        lunch: normalize(updated?.lunch),
        dinner: normalize(updated?.dinner),
      });
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Failed to save all meals');
    } finally {
      setSaving((s) => ({ ...s, all: false }));
    }
  };

  const renderSlot = (mealType: string) => {
    const entries = meals[mealType as keyof typeof meals] ?? [{ recipeId: undefined, recipeName: undefined, people: 1 }];

    return (
      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <select
              aria-label={`Select recipe ${idx + 1} for ${mealType}`}
              className="flex-1 border rounded-md p-2"
              value={entry.recipeId ?? ''}
              onChange={(e) => {
                const id = e.target.value === '' ? undefined : Number(e.target.value);
                const name = recipes.find(r => r.id === id)?.name;
                updateEntry(mealType, idx, { recipeId: id, recipeName: name });
              }}
            >
              <option value="">-- Select a recipe --</option>
              {recipes.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>

            <div className="w-28">
              <input
                type="number"
                min={1}
                value={entry.people ?? 1}
                onChange={(e) => updateEntry(mealType, idx, { people: e.target.value === '' ? 1 : Number(e.target.value) })}
                className="w-full p-2 border rounded-md"
                aria-label={`People for recipe ${idx + 1}`}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => removeEntry(mealType, idx)}
                disabled={(meals[mealType as keyof typeof meals] ?? []).length <= 1}
                className="px-3 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
              >Eliminar</button>
            </div>
          </div>
        ))}

        <div className="flex justify-start items-center">
          <div>
            <button type="button" onClick={() => addEntry(mealType)} className="px-4 py-2 border rounded-md">Agregar receta</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-dark-background">Plan del día</h2>
      <div className="flex items-start justify-between">
        <p className="text-gray-500 mb-6">
        {date.toLocaleDateString('es-ES', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
        </p>
        <div className="ml-4 mt-1">
          <button onClick={handleSaveAll} disabled={saving['all']} className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-60">{saving['all'] ? 'Saving...' : 'Save all'}</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <div className="space-y-6">
          {/* Breakfast */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-secondary">Desayuno</h3>
            {renderSlot('breakfast')}
          </div>

          {/* Lunch */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-secondary">Almuerzo</h3>
            {renderSlot('lunch')}
          </div>

          {/* Dinner */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-secondary">Cena</h3>
            {renderSlot('dinner')}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;