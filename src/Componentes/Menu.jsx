import '/src/header.css';
import React from 'react';

const Menu = ({ onMenuClick }) => {
  return (
    <nav className="flex items-center justify-center bg-nav space-x-5">
      <button onClick={() => onMenuClick('inicio')} className="text-white text-2xl mt-2 mb-2">
        Inicio
      </button>
      <button onClick={() => onMenuClick('cartelera')} className="text-white text-2xl mt-2 mb-2">
        Cartelera
      </button>
      <button onClick={() => onMenuClick('nosotros')} className="text-white text-2xl mt-2 mb-2">
        Acerca de nosotros
      </button>
    </nav>
  );
};

export default Menu;
