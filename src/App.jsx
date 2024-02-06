import React, { useState } from 'react';
import Header from './Componentes/Header';
import MovieSlider from './Componentes/MovieSlider';
import PruebaSlider from './Componentes/PruebaSlider';
import Modal from 'react-modal';
import '/src/MovieSlider.css';
import Footer from './Componentes/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
  const apiKey = '07635952677e8b2635eadcb49a3b569d';

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    setSelectedMovieId(null);
    setSelectedMovieDetails(null);
    setIsPurchaseSuccessful(false);
  };

  const handleMovieClick = async (movieId) => {
    setCurrentPage('movie-details');
    setSelectedMovieId(movieId);

    try {
      const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
      const detailsResponse = await fetch(movieDetailsUrl);
      const detailsData = await detailsResponse.json();

      const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
      const creditsResponse = await fetch(creditsUrl);
      const creditsData = await creditsResponse.json();

      if (detailsData && creditsData) {
        const combinedData = { ...detailsData, credits: creditsData };
        setSelectedMovieDetails(combinedData);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPurchaseSuccessful(false);
  };

  const handleBuyClick = () => {
    setIsPurchaseSuccessful(true);
  };

  const handleBuyButtonClick = () => {
    openModal();
  };

  const MAX_ACTORS_TO_DISPLAY = 5;

  return (
    <div className='bg-buscador'>
      <Header onMenuClick={handleMenuClick}></Header>

      {currentPage === 'inicio' && (
        <div>
          <PruebaSlider onMovieClick={handleMovieClick} />
          <Footer></Footer>
        </div>
      )}

      {currentPage === 'cartelera' && (
        <div>
          <MovieSlider apiKey={apiKey} onMovieClick={handleMovieClick} />
          <Footer></Footer>
        </div>
      )}

      {currentPage === 'movie-details' && selectedMovieDetails && (
        <div>
        <div className='mt-5 ml-30 mr-30 mb-15' style={{ display: 'flex', alignItems: 'flex-start' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovieDetails.poster_path}`}
            alt={selectedMovieDetails.title}
            className="mx-auto mb-4 fotoCartelera"
            style={{ marginRight: '20px' }}
          />
          <div style={{ flex: '1' }}>
            <h2 className="mt-6 mb-4 text-2xl font-bold">{selectedMovieDetails.title}</h2><br />
            <p className="text-lg"><b>Año: </b>{selectedMovieDetails.release_date && selectedMovieDetails.release_date.split('-')[0]}</p>
            <p className="text-lg"><b>Duración: </b>{selectedMovieDetails.runtime} minutos</p>
            <p className="text-lg"><b>Sinopsis: </b>{selectedMovieDetails.overview}</p>
            <h3 className="text-lg font-bold mb-2">Actores:</h3>
            <p>
              {selectedMovieDetails.credits &&
                selectedMovieDetails.credits.cast &&
                selectedMovieDetails.credits.cast
                  .slice(0, MAX_ACTORS_TO_DISPLAY)
                  .map(actor => actor.name)
                  .join(', ')}
              {selectedMovieDetails.credits &&
                selectedMovieDetails.credits.cast &&
                selectedMovieDetails.credits.cast.length > MAX_ACTORS_TO_DISPLAY && '...'}
            </p><br />

            <button className='mb-3 border-2 border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white' onClick={handleBuyButtonClick}><b>Comprar</b></button>
          </div>
          
        </div>
        <Footer></Footer>
        </div>
        
      )}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ content: { width: '300px', height: '300px', margin: 'auto' } }}>
        {isPurchaseSuccessful ? (
          <div>
            <h2>¡Gracias por su compra!</h2>
          </div>
        ) : (
          <div>
            <h2 className='mb-3'><b>Compra de Entradas</b></h2>
            <label htmlFor="horario" >Selecciona el horario: </label>
            <select id="horario" className='mb-3'>
              <option value="5pm">5pm</option>
              <option value="7pm">7pm</option>
              <option value="9pm">9pm</option>
              <option value="23pm">11pm</option>
            </select><br />

            <label htmlFor="salas" >Selecciona la sala: </label>
            <select id="horario" className='mb-3'>
              <option value="Sala 1">Sala 1</option>
              <option value="Sala 2">Sala 2</option>
              <option value="Sala 3">Sala 3</option>
              <option value="Sala 4">Sala 4</option>
            </select><br />

            

            <label htmlFor="numeroEntradas" className='mb-3'>Número de entradas:</label><br />
            <input
                type="number"
                id="numeroEntradas"
                min="1"
                style={{ border: '1px solid black', borderRadius: '4px', padding: '4px' }}
            /><br />

            <button onClick={handleBuyClick} className='mb-3'>Comprar</button><br />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;


