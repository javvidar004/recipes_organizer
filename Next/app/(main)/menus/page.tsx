// app/(main)/menus/page.tsx
'use client';

import { useState } from 'react';
import Calendar from '@/components/menus/Calendar';
import MealPlanner from '@/components/menus/MealPlanner';

/**
 * Página principal de "Menús".
 * Permite a los usuarios planificar sus comidas diarias utilizando un calendario interactivo.
 * Mantiene el estado de la fecha seleccionada y lo pasa a sus componentes hijos.
 */
export default function MenusPage() {
  // El estado 'selectedDate' almacena el día que el usuario ha elegido en el calendario.
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-dark-background mb-6">Planificador de Menús</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna del Calendario */}
        <div className="lg:col-span-1">
          <Calendar 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate} 
          />
        </div>

        {/* Columna del Planificador de Comidas */}
        <div className="lg:col-span-2">
          <MealPlanner 
            date={selectedDate} 
          />
        </div>
        
      </div>
    </div>
  );
}