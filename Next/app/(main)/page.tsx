// app/(main)/page.tsx
'use client';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import QuickActions from '@/components/dashboard/QuickActions';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/lib/api';
import { User } from '@/types';

/**
 * Homepage para usuarios autenticados (Dashboard).
 * Muestra un saludo, acciones rápidas, un vistazo a la próxima comida
 * y una vista previa de las recetas favoritas.
 */
export default function DashboardPage() {

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['user'],
    queryFn: getUserData,
  });

  return (
    <div className="container mx-auto space-y-8">
      {/* 1. Saludo de Bienvenida */}
  <WelcomeHeader name={userData?.uname ?? ''} />

      {/* 2. Acciones Rápidas */}
      <QuickActions />
    </div>
  );
}