import React from 'react';

/**
 * A responsive container component that adapts to different screen sizes
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.fluid=false] - Whether the container should be fluid
 * @param {string} [props.maxWidth=''] - Custom max-width value
 * @param {string} [props.padding='p-3 p-md-4'] - Padding classes
 * @param {Object} [props.style={}] - Additional inline styles
 */
function ResponsiveContainer({ 
  children, 
  className = '', 
  fluid = false, 
  maxWidth = '',
  padding = 'p-3 p-md-4',
  style = {},
  ...rest 
}) {
  const containerClass = fluid ? 'container-fluid' : 'container';
  
  const combinedStyles = {
    ...(maxWidth ? { maxWidth } : {}),
    ...style
  };

  return (
    <div 
      className={`${containerClass} ${padding} ${className}`}
      style={combinedStyles}
      {...rest}
    >
      {children}
    </div>
  );
}

export default ResponsiveContainer; 