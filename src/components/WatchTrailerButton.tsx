
import { FunctionComponent } from 'react';
import PlayCircleIcon from './PlayCircleIcon';

interface WatchTrailerButtonProps {
  onClick?: () => void;
  className?: string;
  isTrailerVisible?: boolean;
}

const WatchTrailerButton: FunctionComponent<WatchTrailerButtonProps> = ({ 
  onClick, 
  className = "",
  isTrailerVisible = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full relative rounded-[9999px] bg-[#9A1E0C] hover:bg-[#6c1308] h-11 flex flex-row items-center justify-center p-2 box-border gap-2 text-left text-sm text-white font-poppins transition-colors ${className}`}
    >
      <div className="relative leading-7 font-semibold">
        {isTrailerVisible ? 'Close Trailer' : 'Watch Trailer'}
      </div>
      <PlayCircleIcon size={18} />
    </button>
  );
};

export default WatchTrailerButton;
