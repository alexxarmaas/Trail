import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    neutral: 'bg-white/50 text-gray-700 border-gray-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
