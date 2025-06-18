
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
    <div className={`w-full max-w-[643px] mx-auto ${className}`}>
      <button
        onClick={onClick}
        className="w-full relative rounded-[9999px] bg-[#9A1E0C] hover:bg-[#6c1308] h-[52px] flex flex-row items-center justify-center p-2 box-border gap-2 text-left text-base text-white font-poppins transition-colors"
      >
        <div className="relative leading-[30px] font-semibold">
          {isTrailerVisible ? 'Close Trailer' : 'Watch Trailer'}
        </div>
        <PlayCircleIcon size={24} />
      </button>
    </div>
  );
};

export default WatchTrailerButton;
