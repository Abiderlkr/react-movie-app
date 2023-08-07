import React from 'react';
import { ListGroup, Image, Row, Col } from 'react-bootstrap';

const MovieList = ({ movies, handleDetails }) => {
  return (
    <ListGroup className="mb-4">
      {movies.map((movie) => (
        <ListGroup.Item
          key={movie.imdbID}
          action
          onClick={() => handleDetails(movie)}
        >
          <Row>
            <Col md={4}>
              <Image src={movie.Poster} alt={movie.Title} rounded fluid />
            </Col>
            <Col md={8}>
              <h4>{movie.Title}</h4>
              <p>Yıl: {movie.Year}</p>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MovieList;