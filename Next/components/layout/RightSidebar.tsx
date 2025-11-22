// components/layout/RightSidebar.tsx
"use client";
import { useRouter } from 'next/navigation';
import { XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { User, UserStats } from '@/types';
import { clearAuth, getUserData } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

// Component props
interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  stats: UserStats;
}

/**
 * Displays user profile information, stats, and a logout button.
 * Slides in from the right.
 */
const RightSidebar = ({ isOpen, onClose, user, stats }: RightSidebarProps) => {
  const router = useRouter();

    const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['user'],
    queryFn: getUserData,
  });

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-dark-background text-white transform transition-transform z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-700">
            <h2 className="text-lg font-bold">Profile</h2>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-secondary p-4 rounded-lg my-4">
            <p className="font-bold text-lg">{`${userData?.uname} ${userData?.ulastName}`}</p>
            <p className="text-sm text-gray-200">{userData?.email}</p>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={() => {
              // clear auth and redirect to main page
              clearAuth();
              try {
                // also clear any other cookies related to session
                if (typeof document !== 'undefined') {
                  document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
                }
              } catch (e) {
                // ignore
              }
              router.push('/');
            }}
            className="mt-auto w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default RightSidebar;