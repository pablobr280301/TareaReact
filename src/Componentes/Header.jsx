import '/src/header.css';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-header">
      <div className="flex items-center justify-between">
        <img src="../img/logoTapacos.png" className="ml-6" alt="" style={{ width: '130px' }} />
        
        <nav className="flex items-center justify-center space-x-5">
          <button onClick={() => onMenuClick('inicio')} className="text-white text-2xl mt-2 mb-2 white-button">
            Inicio
          </button>
          <button onClick={() => onMenuClick('cartelera')} className="text-white text-2xl mt-2 mb-2 white-button">
            Cartelera
          </button>
        </nav>

        <div className="text-right pr-4">
          <h1 className="text-white text-4xl mb-2 mr-9 tituloPagina">TAPACOS</h1>
          <p className="text-white text-xl mr-9 parrafoTitulo">Multicines</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

  