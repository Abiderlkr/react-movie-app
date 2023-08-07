import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import './Favorite.css';
import { Link } from "react-router-dom";

const Favorite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favoriteMovies');
        if (storedFavorites) {
            setFavoriteMovies(JSON.parse(storedFavorites));
        }
    }, []);

    const removeFromFavorites = (movie) => {
        setFavoriteMovies((prevFavoriteMovies) =>
            prevFavoriteMovies.filter((favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID)
        );
        localStorage.setItem(
            'favoriteMovies',
            JSON.stringify(favoriteMovies.filter((favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID))
        );
        const updatedFavorites = favoriteMovies.filter(
            (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
        );
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorite-container">
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Link to="/">
                    <button className="go-back-button">Go Back</button>
                </Link>
            </div>
            <div style={{ marginTop: '20px' }}>
                <div className="heading-box">
                    <h1 className="heading">Favorite Movies</h1>
                </div>
            </div>
            {favoriteMovies.map((movie) => (
                <div className="favorite-movie" key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <Image src={movie.Poster} alt={movie.Title} thumbnail fluid />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <button className="remove-button" onClick={() => removeFromFavorites(movie)}>
                            Remove from Favorites
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Favorite;