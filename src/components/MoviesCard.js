import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';


function MoviesCard(props) {

    const { cardClicked, setCardClicked, selected, setSelected, movies } = props;

    const handleSelect = (id) => {
        if (cardClicked && selected === id) {
            setSelected(null);
            setCardClicked(false);
        } else if (cardClicked) {
            setSelected('');
            setCardClicked(false);
            setTimeout(() => setSelected(id), 600)
            setTimeout(() => setCardClicked(true), 800)
        } else {
            setSelected(id);
            setCardClicked(true);
        }
    }

    const useStyles = makeStyles({
        media: {
            height: '100%',
            width: '100%',
        },
    });
    const classes = useStyles();

    return (
        <div className={`movie-card-container ${selected !== null ? 'slide' : null}`}>
            {movies.map(movie => (
                <Card
                    className={`movie-card ${selected === movie.id ? 'active' : null}`}
                    id={movie.id}
                    key={movie.id}
                    onClick={e => handleSelect(movie.id)}
                >
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={movie.image}
                            title={movie.name}
                        />
                        <div className='genre-container'>
                            {movie.genre.map((g, index) => (
                                <div key={index}>{g}</div>
                            ))}
                        </div>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    )
}


export default MoviesCard;