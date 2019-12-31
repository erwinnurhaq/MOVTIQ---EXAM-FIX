import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';

//redux
import { useSelector } from 'react-redux';


function MovieMarquee() {

    const movies = useSelector(state => state.movieData.movies);

    const useStyles = makeStyles({
        media: {
            height: 421,
            width: 287,
        },
    });

    const classes = useStyles();

    const moviesMap = () => movies.map(movie => (
        <Card
            className="movie-card"
            id={movie.id}
            key={movie.id}
        >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={movie.image}
                    title="Contemplative Reptile"
                />
                <CardContent className='genre-container'>
                    {movie.genre.map((g, index) => (
                        <div key={index}>{g}</div>
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    ))


    return (
        <div className="movie-marquee-container">
            <div className="movie-marquee-wrapper">
                {moviesMap()}
                {moviesMap()}
            </div>
        </div >
    )
}


export default MovieMarquee;