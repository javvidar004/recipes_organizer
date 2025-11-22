// components/dashboard/WelcomeHeader.tsx
interface WelcomeHeaderProps {
  name: string;
}

const WelcomeHeader = ({ name }: WelcomeHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-background">
        ¡Hola de nuevo, {name}! 👋
      </h1>
      <p className="text-gray-600 mt-1">
        ¿Qué te apetece cocinar hoy?
      </p>
    </div>
  );
};

export default WelcomeHeader;