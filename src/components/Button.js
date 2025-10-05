import React from 'react';
import { Link } from 'react-router';

const Button = ({
  children,
  onClick,
  variant = 'default',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
  link, // React Router link
  href, // External link
}) => {
  const baseStyles = 'font-bold rounded transition-colors duration-200 flex items-center justify-center w-max text-decoration-none';

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const styles = {
    default: {
      backgroundColor: '#285F9E',
      color: 'white',
      transition: 'background-color 0.2s ease',
    },
    red: {
      backgroundColor: '#F56565',
      color: 'white',
      transition: 'background-color 0.2s ease',
    },
    darkBlue: {
      backgroundColor: '#0C1B33',
      color: 'white',
      transition: 'background-color 0.2s ease',
    },
  };

  if (link) {
    // Use React Router's Link
    return (
      <Link
        to={link}
        className={`${baseStyles} ${sizes[size]} ${className}`}
        style={styles[variant]}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    // Use an anchor tag for external links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${sizes[size]} ${className}`}
        style={styles[variant]}
      >
        {children}
      </a>
    );
  }

  // Default button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${className}`}
      style={{
        ...styles[variant],
        ...(disabled && { backgroundColor: '#cccccc', color: '#666666', cursor: 'not-allowed' })
      }}
    >
      {children}
    </button>
  );
};

export default Button;