// app/(main)/layout.tsx
'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { mockUser, mockUserStats } from '@/lib/mockData';

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
        user={mockUser}
        stats={mockUserStats}
      />
      
      {/* Main content area */}
      <main className="pt-16 transition-all duration-300">
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}