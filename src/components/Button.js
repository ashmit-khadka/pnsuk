import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'font-bold rounded transition-colors duration-200 flex items-center justify-center w-max';
  
  // const variants = {
  //   primary: 'bg-blue-500 hover:bg-blue-700 text-white',
  //   secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
  //   outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
  // };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  const styles = {
    default: {
      backgroundColor: '#285F9E',
      color: 'white',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#F56565' // Lighter shade of primary color
      }
    },
    darkRed: {
      backgroundColor: '#410A0B',
      color: 'white',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#924546' // Darker shade of primary color
      }
    },
    darkBlue: {
      backgroundColor: '#0C1B33',
      color: 'white',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#285F9E' // Darker shade of primary color
      }
    },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={styles[variant]}
    >
      {children}
    </button>
  );
};

export default Button;