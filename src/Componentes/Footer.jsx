import React from 'react';
import '/src/header.css';

const Footer = () => {
  return (
    <footer className="bg-header text-white p-4">
      <div className="container mx-auto text-center text-white">
        <p className='footerComponente'>&copy; 2024 Cines Tapacos. Todos los derechos reservados.</p>
        <p className='footerComponente'>Contáctanos: info@Tapacos.com</p>
      </div>
    </footer>
  );
};

export default Footer;
