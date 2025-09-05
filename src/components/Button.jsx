import React from 'react'

export default function Button({ onClick, children, variant = 'primary', className = '', type = 'button' }) {
     const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-w-fit';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
    };
  return (
  <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`} type={type}>
            {children}
        </button>
  )
}
