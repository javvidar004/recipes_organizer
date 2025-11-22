"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getIngredientsList, createRecipe, createIngredient } from '@/lib/api';
import { Ingredient } from '@/types';

const UNITS = ['g', 'kg', 'ml', 'L', 'unit'];

type IngredientRow = {
  id?: number; // ingredient id
  query?: string; // search text / selected name
  quantity?: number | '';
  units?: string;
  key: string;
  open?: boolean; // dropdown open
};

export default function NewRecipePage() {
  const router = useRouter();
  const { data: ingredients = [], isLoading, refetch } = useQuery<Ingredient[]>({ queryKey: ['ingredients'], queryFn: getIngredientsList });

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalCalories, setModalCalories] = useState<number | ''>('');
  const [modalCost, setModalCost] = useState<number | ''>('');
  const [pendingRowKey, setPendingRowKey] = useState<string | null>(null);
  const [modalSaving, setModalSaving] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState<number | ''>('');
  const [typeId, setTypeId] = useState<number | ''>('');
  const [rows, setRows] = useState<IngredientRow[]>([{ key: String(Date.now()), id: undefined, quantity: '', units: 'g' }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRow = () => setRows(r => [...r, { key: String(Date.now()) + Math.random().toString(36).slice(2), id: undefined, query: '', quantity: '', units: 'g', open: false }]);
  const removeRow = (key: string) => setRows(r => r.filter(x => x.key !== key));
  const updateRow = (key: string, patch: Partial<IngredientRow>) => setRows(r => r.map(x => x.key === key ? { ...x, ...patch } : x));

  // helper to get ingredient name by id
  const getIngredientName = (id?: number) => ingredients.find(i => i.id === id)?.name ?? '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !description || !prepTime) {
      setError('Please fill name, description and prep time');
      return;
    }

    const ingredientPayload = rows
      .filter(r => r.id && r.quantity !== '' )
      .map(r => ({ ingredientId: Number(r.id), quantity: Number(r.quantity), units: String(r.units ?? 'g') }));

    const payload = {
      name,
      description,
      prepTime: Number(prepTime),
      typeId: typeId === '' ? undefined : Number(typeId),
      ingredients: ingredientPayload,
    };

    try {
      setSaving(true);
      await createRecipe(payload);
      router.push('/recipes');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to create recipe');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateIngredient = async () => {
    if (!modalName || modalName.trim() === '') return;
    setModalSaving(true);
    try {
      const payload = { name: modalName.trim(), calories: modalCalories === '' ? 0 : Number(modalCalories), cost: modalCost === '' ? 0 : Number(modalCost) };
      const newIng = await createIngredient(payload);
      // refetch ingredient list so new ingredient appears
      try { await refetch(); } catch (e) { /* ignore refetch errors */ }

      if (pendingRowKey) {
        updateRow(pendingRowKey, { id: newIng.id, query: newIng.name });
        setPendingRowKey(null);
      }

      // reset and close
      setModalName('');
      setModalCalories('');
      setModalCost('');
      setShowAddModal(false);
    } catch (err) {
      console.error('create ingredient failed', err);
    } finally {
      setModalSaving(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-dark-background mb-6">Crear Nueva Receta</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" rows={4} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiempo de preparación (min)</label>
            <input type="number" value={prepTime} onChange={e => setPrepTime(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 w-full px-4 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo (id)</label>
            <input type="number" value={typeId} onChange={e => setTypeId(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 w-full px-4 py-2 border rounded-md" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ingredientes</label>

          <div className="space-y-2">
            {rows.map(row => (
              <div key={row.key} className="flex items-start gap-2 relative">
                <div className="flex-1">
                  {/* Search-as-you-type input */}
                  <input
                    type="text"
                    value={row.query ?? (row.id ? getIngredientName(row.id) : '')}
                    onChange={e => updateRow(row.key, { query: e.target.value, id: undefined, open: true })}
                    onFocus={() => updateRow(row.key, { open: true })}
                    placeholder="Buscar ingrediente..."
                    className="w-full p-2 border rounded-md"
                  />

                  {/* Dropdown */}
                  {row.open && (
                    <ul className="absolute z-50 bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                      { (
                        ingredients
                          .filter(i => (row.query ?? '').length === 0 ? true : i.name.toLowerCase().includes((row.query ?? '').toLowerCase()))
                          .slice(0, 50)
                      ).map((ing: Ingredient) => (
                        <li
                          key={ing.id}
                          onMouseDown={(ev) => { ev.preventDefault(); /* prevent blur */ }}
                          onClick={() => updateRow(row.key, { id: ing.id, query: ing.name, open: false })}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {ing.name}
                        </li>
                      ))}

                      {/* No results -> offer to add new ingredient for this row */}
                      {ingredients.filter(i => (row.query ?? '').length === 0 ? true : i.name.toLowerCase().includes((row.query ?? '').toLowerCase())).length === 0 && (
                        <li
                          className="px-3 py-2 text-sm text-blue-600 cursor-pointer"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => { setShowAddModal(true); setModalName(row.query ?? ''); setPendingRowKey(row.key); updateRow(row.key, { open: false }); }}
                        >
                          Agregar nuevo ingrediente "{row.query}"
                        </li>
                      )}

                      {ingredients.length === 0 && <li className="px-3 py-2 text-sm text-gray-500">No ingredients</li>}
                    </ul>
                  )}
                </div>

                <div className="w-28">
                  <input type="number" min={0} value={row.quantity ?? ''} onChange={e => updateRow(row.key, { quantity: e.target.value === '' ? '' : Number(e.target.value) })} className="w-full p-2 border rounded-md" placeholder="cantidad" />
                </div>

                <div className="w-24">
                  <select value={row.units} onChange={e => updateRow(row.key, { units: e.target.value })} className="w-full p-2 border rounded-md">
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                <div className="pt-2">
                  <button type="button" onClick={() => removeRow(row.key)} className="px-3 py-2 bg-red-500 text-white rounded-md">Eliminar</button>
                </div>
              </div>
            ))}

            <div>
              <button type="button" onClick={addRow} className="px-4 py-2 bg-secondary text-white rounded-md">Agregar ingrediente</button>
              <button type="button" onClick={() => { setShowAddModal(true); setModalName(''); setPendingRowKey(null); }} className="px-4 py-2 border rounded-md">Agregar nuevo ingrediente</button>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="text-right">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white rounded-md disabled:opacity-60">{saving ? 'Guardando...' : 'Guardar Receta'}</button>
        </div>
      </form>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Agregar nuevo ingrediente</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input value={modalName} onChange={e => setModalName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calorías</label>
                  <input type="number" value={modalCalories} onChange={e => setModalCalories(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Costo</label>
                  <input type="number" value={modalCost} onChange={e => setModalCost(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => { setShowAddModal(false); setPendingRowKey(null); }} className="px-4 py-2 border rounded-md">Cancelar</button>
              <button type="button" onClick={handleCreateIngredient} disabled={modalSaving} className="px-4 py-2 bg-primary text-white rounded-md">{modalSaving ? 'Guardando...' : 'Guardar'}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
