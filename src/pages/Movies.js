import React, { useState } from 'react';
import '../styles/App.scss';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';


//redux
import { useSelector } from 'react-redux';

//components
import ModalWarning from '../components/ModalWarning';
import MoviesCard from '../components/MoviesCard';
import Footer from '../components/Footer';



function Movies(props) {

    const movies = useSelector(state => state.movieData.movies);
    const isLogin = useSelector(state => state.userData.isLogin)
    const [selected, setSelected] = useState(null);
    const [cardClicked, setCardClicked] = useState(false);
    const [modalWarningLogin, setModalWarningLogin] = useState(false);


    const toReservationPageHandler = () => {
        if (isLogin) {
            props.history.push(`/seatreservation/id=${selected}`)
        } else {
            setModalWarningLogin(!modalWarningLogin)
        }
    }

    return (
        <>
            <div className="movies-container">
                <div className="bg-back">
                    <img
                        className={cardClicked ? 'show' : ''}
                        src={cardClicked && selected ? `${movies[selected - 1].bg}` : ''}
                        alt='bgImage' />
                </div>
                <div className="movies-list-container">

                    <MoviesCard selected={selected} setSelected={setSelected} cardClicked={cardClicked} setCardClicked={setCardClicked} />

                    <div className={`movie-desc-container ${selected ? 'show' : ''}`}>
                        <div className="movie-desc-content">
                            {cardClicked && selected ? (
                                <>
                                    <div><iframe title={movies[selected - 1].name} width="420" height="236" src={movies[selected - 1].trailer} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
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
                                </>
                            ) : ''}
                        </div>
                        <div className='white-side2'></div>
                    </div>
                </div>
            </div>
            <Footer />
            <ModalWarning
                show={modalWarningLogin}
                setShow={setModalWarningLogin}
                text={`Please login before you proceed!`}
            />
        </>
    )
}


export default withRouter(Movies);