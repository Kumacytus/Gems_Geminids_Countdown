import React from 'react';

interface GeminiStarProps {
  size?: number;
  className?: string;
  fill?: string;
}

const GeminiStar: React.FC<GeminiStarProps> = ({ size = 24, className = '', fill = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C13.5 7.5 16.5 10.5 22 12C16.5 13.5 13.5 16.5 12 22C10.5 16.5 7.5 13.5 2 12C7.5 10.5 10.5 7.5 12 2Z"
        fill={fill}
      />
    </svg>
  );
};

export default GeminiStar;