// components/menus/Calendar.tsx
'use client';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Definimos las props que recibirá el componente
interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

/**
 * Componente de Calendario.
 * Muestra una vista de mes y permite al usuario navegar y seleccionar un día.
 * NOTA: Este es un calendario simplificado para demostración.
 * Para una funcionalidad completa, se recomienda usar una librería como `react-day-picker`.
 */
const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  // Lógica simple para renderizar los días del mes actual.
  // Display month is controlled locally so the user can navigate months
  const [displayDate, setDisplayDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  // Keep display month in sync if the parent changes `selectedDate`
  useEffect(() => {
    setDisplayDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const displayYear = displayDate.getFullYear();
  const displayMonth = displayDate.getMonth();
  const today = new Date();

  const prevMonth = () => setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  // number of days in the displayed month
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // weekday of the 1st of the month (0 = Sunday, 6 = Saturday)
  // convert to Monday-first padding: pads = (firstWeekday + 6) % 7
  const firstWeekday = new Date(displayYear, displayMonth, 1).getDay();
  const padCount = (firstWeekday + 6) % 7;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="font-bold text-lg text-dark-background">
          {displayDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Monday-first weekday labels (Lunes..Domingo) */}
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
          <div key={day} className="font-semibold text-sm text-gray-500">{day}</div>
        ))}
        {/* pad empty slots so the 1st of the month falls on the correct weekday (Monday-first) */}
        {Array.from({ length: padCount }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map((day) => {
          const isSelected =
            selectedDate.getFullYear() === displayYear &&
            selectedDate.getMonth() === displayMonth &&
            selectedDate.getDate() === day;
          const isToday =
            today.getFullYear() === displayYear &&
            today.getMonth() === displayMonth &&
            today.getDate() === day;
          return (
            <button
              key={day}
              onClick={() => onDateSelect(new Date(displayYear, displayMonth, day))}
              className={`p-2 rounded-full transition-colors ${
                isSelected
                  ? 'bg-primary text-white scale-110'
                  : isToday
                  ? 'bg-blue-100 text-primary'
                  : 'hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;