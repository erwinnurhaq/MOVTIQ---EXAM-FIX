import React, { useState } from 'react';

//components
import MoviesCard from '../components/MoviesCard';
import MoviesCardDesc from '../components/MoviesCardDesc';

//redux
import { useSelector } from 'react-redux';

function Movies() {

    const movies = useSelector(state => state.movieData.movies);
    const isLogin = useSelector(state => state.userData.isLogin)
    const [selected, setSelected] = useState(null);
    const [cardClicked, setCardClicked] = useState(false);

    return (
        <div className="movies-container">
            <div className="bg-back">
                <img
                    className={cardClicked ? 'show' : ''}
                    src={cardClicked && selected ? `${movies[selected - 1].bg}` : ''}
                    alt='bgImage' />
            </div>
            <div className="movies-content">
                <MoviesCard
                    movies={movies}
                    selected={selected}
                    setSelected={setSelected}
                    cardClicked={cardClicked}
                    setCardClicked={setCardClicked}
                />
                <MoviesCardDesc
                    movies={movies}
                    isLogin={isLogin}
                    selected={selected}
                    cardClicked={cardClicked}
                />
            </div>
        </div>
    )
}


export default Movies;