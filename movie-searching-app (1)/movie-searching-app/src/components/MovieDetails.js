import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const MovieDetails = ({ movie }) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  console.log(favoriteMovies);
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=1f33adaf`);
        setMovieDetail(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovieDetail();
  }, [movie.imdbID]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      setFavoriteMovies(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const isMovieFavorite = favoriteMovies.some(favoriteMovie => favoriteMovie.imdbID === movie.imdbID);

  const toggleFavorite = () => {
    setFavoriteMovies(prevFavoriteMovies => {
      if (isMovieFavorite) {
        return prevFavoriteMovies.filter(favoriteMovie => favoriteMovie.imdbID !== movie.imdbID);
      } else {
        return [...prevFavoriteMovies, { ...movie, isFavorite: true }];
      }
    });
  };

  return (
    <Card>
      <Card.Header as="div" className="d-flex justify-content-between align-items-center">
        <h3>{movieDetail.Title}</h3>
        <div>
          {isMovieFavorite ? (
            <BsHeartFill className="ml-2 text-danger heart-icon" onClick={toggleFavorite} />
          ) : (
            <BsHeart className="ml-2 heart-icon" onClick={toggleFavorite} />
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <Image src={movieDetail.Poster} alt={movieDetail.Title} className="mb-3" thumbnail fluid />
        <p>Year: {movieDetail.Year}</p>
        <p>Imdb Point: {movieDetail.imdbRating}</p>
        <p>Released: {movieDetail.Released}</p>
        <p>Runtime: {movieDetail.Runtime}</p>
        <p>Genre: {movieDetail.Genre}</p>
        <p>Director: {movieDetail.Director}</p>
        <p>Writer: {movieDetail.Writer}</p>
        <p>Actors: {movieDetail.Actors}</p>
        <p>Language: {movieDetail.Language}</p>
        <p>Country: {movieDetail.Country}</p>
        {/* <p>Awards: {movieDetail.Awards}</p> */}
        {/* <p>imdbVotes: {movieDetail.imdbVotes}</p> */}
        {/* <p>Plot: {movieDetail.Plot}</p> */}
        {/* <p>Rated: {movieDetail.Rated}</p> */}
      </Card.Body>
    </Card>
  );
};

export default MovieDetails;
