import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";
import { Link } from "react-router-dom";
import './style/Home.css';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [sortedMovies, setSortedMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `http://www.omdbapi.com/?s=movie&apikey=1f33adaf`
                );
                const unsortedMovies = response.data.Search || [];
                const sortedMovies = unsortedMovies.sort((a, b) =>
                    b.Year.localeCompare(a.Year)
                );
                setMovies(unsortedMovies);
                setSortedMovies(sortedMovies);
                setSelectedMovie(null);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?s=${searchQuery}&apikey=1f33adaf`
            );
            const unsortedMovies = response.data.Search || [];
            const sortedMovies = unsortedMovies.sort((a, b) =>
                b.Year.localeCompare(a.Year)
            );
            setMovies(sortedMovies);
            setSelectedMovie(null);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDetails = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <Container className="mt-4">
            <div className="heading-box">
                <h1 className="heading">Movie Search App</h1>
            </div>
            <Row className="form-container">
                <Col md={9}>
                    <Form onSubmit={handleSearch}>
                        <Form.Group as={Row}>
                            <Col md={9}>
                                <Form.Control
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Add to Movie and Keyword"
                                />
                            </Col>
                            <Col md={3}>
                                <Button type="submit" variant="primary" block style={{ backgroundColor: "#dc3545" }}>
                                    Search
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={3}>
                    <Row className="justify-content-end">
                        <Link to="/favorite">
                            <Button className="favorite-button" variant="primary" style={{ backgroundColor: "#dc3545" }}>
                                My Favorites
                            </Button>
                        </Link>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="movie-list-container">
                    <MovieList movies={movies} handleDetails={handleDetails} />
                </Col>
                <Col md={6}>
                    {/* <div className="choose-movie-container">
              <p className="choose-movie-text">Choose Movie for Details</p>
            </div> */}
                    {selectedMovie && (
                        <div className="movie-details-container">
                            <MovieDetails movie={selectedMovie} />
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
export default Home;