import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-green-900 shadow-primary/30',
    secondary: 'bg-white/50 text-gray-900 hover:bg-white shadow-gray-200/50 backdrop-blur-sm',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
