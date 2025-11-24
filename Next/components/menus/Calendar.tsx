// components/menus/Calendar.tsx
'use client';
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
  // Use the selectedDate as the month to display (not always "today")
  const displayYear = selectedDate.getFullYear();
  const displayMonth = selectedDate.getMonth();
  const today = new Date();

  // number of days in the displayed month
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // weekday of the 1st of the month (0 = Sunday, 6 = Saturday)
  const firstWeekday = new Date(displayYear, displayMonth, 1).getDay();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="font-bold text-lg text-dark-background">
          {today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(day => (
          <div key={day} className="font-semibold text-sm text-gray-500">{day}</div>
        ))}
        {/* pad empty slots so the 1st of the month falls on the correct weekday */}
        {Array.from({ length: firstWeekday }).map((_, i) => (
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