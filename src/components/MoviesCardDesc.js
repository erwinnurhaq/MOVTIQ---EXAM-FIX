import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

//components
import ModalWarning from '../components/ModalWarning';

function MoviesCardDesc(props) {

    const { cardClicked, selected, movies, isLogin } = props;
    const [modalWarningLogin, setModalWarningLogin] = useState(false);

    const toReservationPageHandler = () => {
        if (isLogin) {
            props.history.push(`/seatreservation/id=${selected}`)
        } else {
            setModalWarningLogin(!modalWarningLogin)
        }
    }

    return (
        <div className={`movie-desc-container ${selected ? 'show' : ''}`}>
            {cardClicked && selected ? (
                <div className="movie-desc-content">
                    <div className="trailer"><iframe title={movies[selected - 1].name} width="100%" height="100%" src={movies[selected - 1].trailer} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                    <h1>{movies[selected - 1].name}</h1>
                    <div className="genre-list">{movies[selected - 1].genre.map((g, index) => (
                        <div className="genre" key={index}>{g}</div>
                    ))}</div>
                    <div className="duration">Duration: {movies[selected - 1].duration} Minutes</div>
                    <div className="director">Director: {movies[selected - 1].director}</div>
                    <div className="cast-list">Casts: {movies[selected - 1].casts.join(", ")}</div>
                    <div className="synopsis0">Synopsis:</div>
                    <div className="synopsis1">
                        <p>{movies[selected - 1].synopsis}</p>
                    </div>
                    <div className="btn-container">
                        <Button variant="contained" className="btn-book" onClick={toReservationPageHandler}>Book Tickets!</Button>
                    </div>
                </div>
            ) : null}
            <div className='white-side2'></div>
            <ModalWarning
                show={modalWarningLogin}
                setShow={setModalWarningLogin}
                text={`Please login before you proceed!`}
            />
        </div>
    )
}

export default withRouter(MoviesCardDesc);
