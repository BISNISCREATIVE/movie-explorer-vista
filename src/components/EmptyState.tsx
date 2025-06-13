
interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-24 h-24 mx-auto mb-6 opacity-50">
        🎬
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md">{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;
