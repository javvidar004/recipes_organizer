// app/(main)/layout.tsx
'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

import { getUserData } from '@/lib/api';
import { UserProvider } from '@/lib/userContext';

/**
 * Main layout for authenticated users.
 * It manages the state of both sidebars and provides them along with the navbar
 * to all child pages within this route group.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => setLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!isRightSidebarOpen);

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="min-h-screen bg-background text-gray-800">
      <Navbar
        onToggleLeftSidebar={toggleLeftSidebar}
        onToggleRightSidebar={toggleRightSidebar}
      />
      <LeftSidebar isOpen={isLeftSidebarOpen} onClose={() => setLeftSidebarOpen(false)} />
      <RightSidebar
        isOpen={isRightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
        user={userData}
      />

      {/* Main content area - provide user via context to children */}
      <UserProvider value={userData ?? null}>
        <main className="pt-16 transition-all duration-300">
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </UserProvider>
    </div>
  );
}