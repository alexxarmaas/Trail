import React from 'react';

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`glass rounded-2xl p-6 shadow-xl ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
