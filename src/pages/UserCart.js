import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { useParams, Redirect } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getLocal, userTransaction } from '../redux/allAction';
//components
import Footer from '../components/Footer';
import TableCart from '../components/TableCart';
import ModalRemove from '../components/ModalRemove';
import ModalWarning from '../components/ModalWarning';
import ModalSuccessCheckout from '../components/ModalSuccessCheckout';



function UserCart() {

    // Formatter Rupiah
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2
    });

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.userData.isLogin);
    const user = useSelector(state => state.userData.user);
    const movies = useSelector(state => state.movieData.movies);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalRemove, setModalRemove] = useState(false);
    const [modalSuccessCheckout, setModalSuccessCheckout] = useState(false);
    const [modalCheckoutBlank, setModalCheckoutBlank] = useState(false);

    let cart = user.cart;

    const totalPriceCart = () => {
        let price = 0;
        for (let i = 0; i < cart.length; i++) {
            price += cart[i].sumPrice
        }
        return price;
    }

    const removeCartHandler = sel => {
        let seats = cart[sel].seats;
        let idxMovie = movies.findIndex(a => a.name === cart[sel].title);
        let booked = movies[idxMovie].booked;

        for (let i = 0; i < seats.length; i++) {
            let idx = booked.findIndex(a => a[0] === seats[i][0] && a[1] === seats[i][1]);
            if (idx >= 0) {
                booked.splice(idx, 1);
            }
        }
        Axios.patch(`${API_URL}/movies/${idxMovie + 1}`, { booked: booked })
            .then(resp => {
                console.log('movie book removed');
                cart.splice(sel, 1);
                Axios.patch(`${API_URL}/users/${user.id}`, { cart: cart })
                    .then(resp => {
                        console.log('cart updated');
                        dispatch(getLocal())
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const checkOutHandler = () => {
        let t = new Date();
        let year = t.getFullYear();
        let month = t.getMonth();
        let date = t.getDate();
        let hours = t.getHours();
        let minutes = t.getMinutes();
        let transaction = {
            username: user.username,
            userId: user.id,
            date: `${year}/${month}/${date}`,
            hours: hours,
            minutes: minutes,
            ticketAmount: cart.length,
            totalPrice: totalPriceCart(),
            transactionDetail: cart
        }
        if (cart.length === 0) {
            setModalCheckoutBlank(!modalCheckoutBlank);
        } else {
            Axios.post(`${API_URL}/transactions`, { ...transaction })
                .then(resp => {
                    console.log('transaction success')
                    console.log(resp.data);
                    Axios.patch(`${API_URL}/users/${user.id}`, { cart: [] })
                        .then(resp => {
                            console.log('cart emptied');
                            dispatch(getLocal());
                            dispatch(userTransaction(user.username));
                            setModalSuccessCheckout(!modalSuccessCheckout)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        dispatch(getLocal());
    }, [dispatch])

    if (isLogin === false) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className="user-tickets-container">
                <div className="user-tickets-wrapper">
                    <div className="cart-container">
                        <h1>My Cart</h1>
                        <TableCart
                            formatter={formatter}
                            carts={user.cart}
                            movies={movies}
                            setSelectedRow={setSelectedRow}
                            modalRemove={modalRemove}
                            setModalRemove={setModalRemove}
                            checkOutHandler={checkOutHandler}
                            totalPriceCart={totalPriceCart}
                        />
                    </div>
                </div>
                <Footer />
                <ModalRemove
                    action={removeCartHandler}
                    modalRemove={modalRemove}
                    setModalRemove={setModalRemove}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    text={`Are your sure want to remove this ticket?`}
                />
                <ModalSuccessCheckout
                    modalSuccessCheckout={modalSuccessCheckout}
                    setModalSuccessCheckout={setModalSuccessCheckout}
                    userId={user.id}
                />
                <ModalWarning
                    show={modalCheckoutBlank}
                    setShow={setModalCheckoutBlank}
                    text={'Please book some tickets!'}
                />
            </div>
        )
    }
}


export default UserCart;
