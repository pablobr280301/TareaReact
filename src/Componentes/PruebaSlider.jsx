import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '/src/PruebaSlider.css';

const PruebaCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      key={movie.id}
      className={`prueba-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ marginBottom: '10%' }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="prueba-poster"
        style={{ height: '500px', width: '350px', borderRadius: '10px', marginTop: '5%' }}
      />
      <div className={`card-details ${isHovered ? 'show-details' : ''}`}>
        <p className="text-center font-bold">{movie.title}</p>
        <p className="text-center">{`TMDB Rating: ${movie.vote_average}`}</p>
      </div>
    </div>
  );
};

const PruebaSlider = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = '07635952677e8b2635eadcb49a3b569d';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://api.themoviedb.org/3/discover/movie';
        const response = await fetch(`${apiUrl}?api_key=${apiKey}&sort_by=popularity.desc`);
        const data = await response.json();

        if (data.results) {
          const sortedMovies = data.results;
          setMovies(sortedMovies);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiKey]);

  const MovieDetails = ({ movie }) => {
    return (
      <div>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ height: '500px', width: '350px', borderRadius: '10px', marginTop: '5%' }}
        />
        <p>{`Año: ${new Date(movie.release_date).getFullYear()}`}</p>
        <p>{`Duración: ${movie.runtime} minutos`}</p>
        <p>{movie.overview}</p>
      </div>
    );
  };

  return (
    <div className='bg-buscador text-black' style={{ marginBottom: '10%' }}>
      <Slider slidesToShow={4} slidesToScroll={1} autoplay autoplaySpeed={3000}>
        {movies.map((movie) => (
          <PruebaCard key={movie.id} movie={movie} />
        ))}
      </Slider>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl mt-10">Ofertas</h1>
        <div className="flex mt-6">
          <div className="flex flex-col items-center justify-center">
            <img src="../img/fotoPromo1.png" alt="" className="mr-4" />
            <p><b>Entradas más baratas los Miércoles</b></p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="../img/fotoPromo2.png" alt="" className="mr-4" />
            <p><b>Celebra tu cumpleaños en el cine</b></p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="../img/fotoPromo3.png" alt="" />
            <p><b>Ven al cine con tu clase en horario escolar</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PruebaSlider;
