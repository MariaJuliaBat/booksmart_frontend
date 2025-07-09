import React from 'react';
import { SiBookstack } from 'react-icons/si';

/**
 * @component Navbar
 * @description Barra de navegação superior da aplicação.
 */
const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          <SiBookstack className="h-8 w-8 text-slate-800" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;