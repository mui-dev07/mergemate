import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ResponsiveContainer from './ResponsiveContainer';
import { useTheme } from '../context/ThemeContext';

/**
 * A responsive page layout component with theme support
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.title - Page title
 * @param {string} [props.description=''] - Page description for SEO
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.fluid=false] - Whether the container should be fluid
 * @param {boolean} [props.containerized=true] - Whether to wrap in a container
 * @param {React.ReactNode} [props.header] - Optional header content
 * @param {boolean} [props.animate=true] - Whether to animate page content
 */
function PageLayout({ 
  children,
  title,
  description = '',
  className = '',
  fluid = false,
  containerized = true,
  header,
  animate = true,
  ...rest
}) {
  const { isDarkMode } = useTheme();
  
  // Apply animations only when the component mounts, not during theme changes
  useEffect(() => {
    // This is just here to ensure we don't re-animate on theme changes
  }, []);

  const pageClasses = [
    'page-wrapper',
    className,
    isDarkMode ? 'dark-theme' : 'light-theme',
    animate ? 'animate-fade-in' : ''
  ].filter(Boolean).join(' ');

  const content = (
    <div className={pageClasses}>
      {header && (
        <div className={`page-header p-responsive mb-4 ${animate ? 'animate-slide-down' : ''}`}>
          {containerized ? (
            <ResponsiveContainer fluid={fluid}>
              {header}
            </ResponsiveContainer>
          ) : header}
        </div>
      )}
      
      <div className="page-content" {...rest}>
        {containerized ? (
          <ResponsiveContainer fluid={fluid}>
            {children}
          </ResponsiveContainer>
        ) : children}
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{title} - MergeMate</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      {content}
    </>
  );
}

export default PageLayout; 