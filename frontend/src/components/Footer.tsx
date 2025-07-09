import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-surface/90 backdrop-blur text-brand-text-secondary border-t border-white/10">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Booksmart</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
