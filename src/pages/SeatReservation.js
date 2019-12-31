import React, { useState, useEffect } from 'react';
import '../styles/App.scss';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom'
import { API_URL } from '../support/API_URL';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getLocal } from '../redux/allAction';

//components
import ModalSuccessCart from '../components/ModalSuccessCart';
import ModalWarning from '../components/ModalWarning';
import Footer from '../components/Footer';



const SeatReservation = () => {

    const dispatch = useDispatch();

    //passing id movie
    let { selected } = useParams()
    let movieIdx = selected - 1;

    //passing global state
    let user = useSelector(state => state.userData.user);
    let isLogin = useSelector(state => state.userData.isLogin);
    let movies = useSelector(state => state.movieData.movies);


    //state movie
    let initialState = {
        chosen: [],
        price: 0,
        count: 0
    }
    const [state, setState] = useState(initialState);
    const [cart, setCart] = useState([]);
    const [booked, setBooked] = useState([]);
    console.log(state)

    //asumed layout (there will be different layouts for different cinemas)
    // 0 for space, 1 for seat
    let seatLayout = [
        [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

    //layout numbered
    let seatNumbered = []
    for (let j = 0; j < seatLayout.length; j++) {
        let seatNumberedRow = []
        let counter = 1;
        for (let i = 0; i < seatLayout[j].length; i++) {
            if (seatLayout[j][i] === 0) {
                seatNumberedRow.push(0)
            } else {
                seatNumberedRow.push(counter);
                counter++;
            }
        }
        seatNumbered.push(seatNumberedRow)
    }

    //find existing
    const findExistingIdxSeat = (row, col) => {
        let existing = state.chosen.findIndex(a => a[0] === row && a[1] === col);
        return existing;
    }
    const findExistingCart = () => {
        let existing = user.cart.findIndex(a => a.title === movies[movieIdx].name);
        return existing;
    }

    //function to handle click on seat (add and remove chosen)
    const handleSeat = (row, col) => {
        let idxSeat = findExistingIdxSeat(row, col) //find existing on chosen
        let { chosen, price, count } = state;
        if (idxSeat < 0) {
            chosen.push([row, col]);
            setState({
                chosen: chosen,
                price: price += 50000,
                count: count += 1
            });
        } else {
            chosen.splice(idxSeat, 1);
            setState({
                chosen: chosen,
                price: price -= 50000,
                count: count -= 1
            });
        }
    }

    //function to handle book my ticket
    const handleCart = () => {
        let { chosen, price, count } = state;
        if (count !== 0 && isLogin === true) {
            console.log(chosen, price, count)
            let existingIdx = findExistingCart();
            console.log(existingIdx)
            if (existingIdx >= 0) {
                console.log('ada')
                user.cart[existingIdx].sumPrice += price;
                user.cart[existingIdx].seats.push(...chosen);
                user.cart[existingIdx].seatAmount += count;
                cart.push(...user.cart)
                setCart(cart)
            } else {
                console.log('baru')
                cart.push(...user.cart, {
                    title: movies[movieIdx].name,
                    sumPrice: price,
                    seats: chosen,
                    seatAmount: count
                })
                setCart(cart)
            }
            updateDB(cart, chosen); // update DB cart User and booked movie data
        } else if (count !== 0 && isLogin === false) {
            setModalWarningLogin(!modalWarningLogin)
        } else {
            setModalWarningCart(!modalWarningCart)
        }
    }

    //function to update DB cart User and booked movie data
    const updateDB = (cart, chosen) => {
        console.log(cart);
        Axios.patch(`${API_URL}/users/${user.id}`, { cart: cart })
            .then(resp => {
                console.log(resp.data)
                dispatch(getLocal());
                let bookedUpdate = [];
                bookedUpdate.push(...booked, ...chosen)
                Axios.patch(`${API_URL}/movies/${selected}`, { booked: bookedUpdate })
                    .then(resp => {
                        console.log(resp.data);
                        setModalSuccessCart(!modalSuccessCart);
                    })
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        //update usercart
        dispatch(getLocal());
        //fetch booked data on mount
        Axios.get(`${API_URL}/movies/${selected}`)
            .then(resp => {
                console.log('success fetch booked');
                setBooked(resp.data.booked)
            })
            .catch(err => console.log(err));
    }, [selected, dispatch])


    const [modalSuccessCart, setModalSuccessCart] = useState(false);
    const [modalWarningCart, setModalWarningCart] = useState(false);
    const [modalWarningLogin, setModalWarningLogin] = useState(false);
    const alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    //check booked and chosen seat
    const checkBooked = (rowIdx, seat) => booked.findIndex(a => a[0] === seatLayout.length - rowIdx && a[1] === seat);
    const checkChosen = (rowIdx, seat) => state.chosen.findIndex(a => a[0] === seatLayout.length - rowIdx && a[1] === seat);

    //render seat
    const renderSeat = () => {
        return seatNumbered.map((row, rowIdx) => (
            <ul key={rowIdx}>
                {row.map((seat, idx) => {
                    let reverseRowIdx = seatLayout.length - rowIdx;
                    if (seat > 0) {
                        return (
                            <li key={idx + 1}
                                id={`${reverseRowIdx} ${seat}`}
                                onClick={checkBooked(rowIdx, seat) >= 0 ? null : () => handleSeat(reverseRowIdx, seat)}
                                className={`fill-seat ${checkBooked(rowIdx, seat) >= 0 ? 'disabled' : null}`}
                            >
                                <EventSeatIcon color={
                                    checkChosen(rowIdx, seat) >= 0 ? 'secondary'
                                        : checkBooked(rowIdx, seat) >= 0 ? 'disabled'
                                            : 'inherit'
                                } />
                                <div className='seat-label'>
                                    {alf.charAt(reverseRowIdx - 1)}{seat}
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <li className="blank-seat" key={idx + 1}>&nbsp;</li>
                        )
                    }
                })}
            </ul >
        ))
    }

    //render Description
    const renderDesc = () => {
        return (
            <div className='reservation-desc-container'>
                <div className="reservation-desc">
                    <div>Cinema: -</div>
                    <div>Date: -</div>
                    <div>Time: -</div>
                    <div>Screen: -</div>
                    <div>Audi: -</div>
                </div>
                <div className="seats-list">
                    <h1>Seats No:</h1>
                    <div className="seats-no">
                        {state.chosen.map((seat, idx) => (
                            <div key={idx}>{alf.charAt(seat[0] - 1)}{seat[1]}</div>
                        ))}
                    </div>
                </div>
                <div className="seat-price">
                    <div>Price: {state.price}</div>
                    <div>Seats: {state.count}</div>
                </div>
            </div>
        )
    }

    //!MAIN RENDER-------------------------------------------------------------------/
    if (movies.length === 0) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className="seat-reservation-container">
                <div className="arrow-container">
                    <Link to='/movies'>
                        <ArrowBackIosIcon />
                        <h1>BACK</h1>
                    </Link>
                </div>
                <div className="seat-reservation-content">
                    <div className="top-container">
                        <div className="info1"><EventSeatIcon color='inherit' /><div>AVAILABLE</div></div>
                        <h1>PICK YOUR SEATS!</h1>
                        <Button onClick={() => setState(initialState)}><RefreshIcon />REFRESH</Button>
                    </div>
                    <div className="seat-container">
                        <div className="movie-desc">
                            <img src={movies[movieIdx].image} alt={movies[movieIdx].name} />
                            <div className="desc">
                                <div className="title">{movies[movieIdx].name}</div>
                                <div className="genre-list">{movies[movieIdx].genre.map(g => (
                                    <div className="genre" key={g}>{g}</div>
                                ))}</div>
                                <div className="duration">Duration: {movies[movieIdx].duration} Minutes</div>
                            </div>
                        </div>
                        <div className="screen-container">
                            <div className="screen">SCREEN</div>
                            <div className="seat">
                                {renderSeat()}
                            </div>
                            <div className="desc-container">
                                {renderDesc()}
                                <Button variant='contained' onClick={handleCart} >BOOK MY TICKET!</Button>
                            </div>
                        </div>
                    </div>
                </div >
                <Footer />
                <ModalSuccessCart
                    userId={user.id}
                    modalSuccessCart={modalSuccessCart}
                    setModalSuccessCart={setModalSuccessCart}
                />
                <ModalWarning
                    show={modalWarningCart}
                    setShow={setModalWarningCart}
                    text={`Please choose a seat before you proceed!`}
                />
                <ModalWarning
                    show={modalWarningLogin}
                    setShow={setModalWarningLogin}
                    text={`Please login before you proceed!`}
                />
            </div>
        )
    }
    //!END MAIN RENDER-----------------------------------------------------------------/
}


export default SeatReservation;