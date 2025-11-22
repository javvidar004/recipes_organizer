// components/layout/Navbar.tsx
'use client';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';

// Props interface for the Navbar component
interface NavbarProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
}

/**
 * The main navigation bar for authenticated users.
 * Contains toggles for opening and closing the sidebars.
 */
const Navbar = ({ onToggleLeftSidebar, onToggleRightSidebar }: NavbarProps) => {
  return (
    <nav className="bg-dark-background text-white shadow-md w-full z-20 fixed top-0">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Left Section: Menu Toggle and Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleLeftSidebar}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Recipe Manager</h1>
        </div>
        
        {/* Right Section: Profile Toggle */}
        <button
          onClick={onToggleRightSidebar}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors"
          aria-label="Toggle profile"
        >
          <span className="hidden sm:inline">Profile</span>
          <UserCircleIcon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;