// app/(auth)/layout.tsx

/**
 * Layout for authentication pages (Login, Signup, etc.).
 * It provides a clean, centered layout without navigation bars.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </main>
  );
}