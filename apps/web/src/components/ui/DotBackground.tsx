import React from 'react';

export interface DotBackgroundProps {
  dotSize?: number;
  gap?: number;
  color?: string; // e.g., "bg-slate-300"
  borderColor?: string; // e.g., "border-slate-300"
  className?: string;
}

const DotBackground: React.FC<DotBackgroundProps> = ({
  dotSize = 2,
  gap = 20,
  color = 'bg-slate-300',
  borderColor = 'border-slate-300',
  className = 'h-32', 
}) => {
  return (
    <div className={`relative w-full overflow-hidden border ${borderColor} ${className}`}>
      <div
        className={`absolute inset-0 h-full w-full ${color}`}
        style={{
          maskImage: `radial-gradient(circle ${dotSize}px at center, black 100%, transparent 0%)`,
          maskSize: `${gap}px ${gap}px`,
          WebkitMaskImage: `radial-gradient(circle ${dotSize}px at center, black 100%, transparent 0%)`,
          WebkitMaskSize: `${gap}px ${gap}px`,
        }}
      />
    </div>
  );
};

export default DotBackground;