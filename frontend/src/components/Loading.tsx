import { ShoppingBag } from 'lucide-react';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading = ({ fullScreen = true }: LoadingProps) => {
  return (
    <div className={`loading-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="loading-spinner">
        <ShoppingBag className="spinner-icon" />
        <div className="spinner-text">Valla Collection</div>
      </div>
    </div>
  );
};

export default Loading;
