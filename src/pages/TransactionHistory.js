import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import ListAltIcon from '@material-ui/icons/ListAlt';
import '../styles/App.scss';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransactions, fetchMovies } from '../redux/allAction';

//components
import Footer from '../components/Footer';
import ModalRemove from '../components/ModalRemove';
import TableTransactionHistory from '../components/TableTransactionHistory';



function TransactionHistory(props) {

    const dispatch = useDispatch();
    const movies = useSelector(state => state.movieData.movies)
    const transactions = useSelector(state => state.transactionData.transactions);

    const removeTransHandler = transId => {
        let transIndex = transactions.findIndex(a => a.id === transId);
        let tickets = transactions[transIndex].transactionDetail;
        for (let j = 0; j < tickets.length; j++) {
            let idxMovie = movies.findIndex(a => a.name === tickets[j].title);
            if (idxMovie < 0) { break }
            let seats = tickets[j].seats;
            let booked = movies[idxMovie].booked;
            for (let i = 0; i < seats.length; i++) {
                let idx = booked.findIndex(a => a[0] === seats[i][0] && a[1] === seats[i][1]);
                if (idx >= 0) {
                    booked.splice(idx, 1);
                }
            }
            Axios.patch(`${API_URL}/movies/${movies[idxMovie].id}`, { booked: booked })
                .then(resp => {
                    console.log('movie book removed');
                })
                .catch(err => console.log(err))
        }
        Axios.delete(`${API_URL}/transactions/${transId}`)
            .then(resp => {
                console.log('selected transaction removed');
                dispatch(fetchAllTransactions());
                dispatch(fetchMovies());
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        dispatch(fetchAllTransactions());
    }, [dispatch])

    const [selectedRow, setSelectedRow] = useState(null);
    const [modalRemove, setModalRemove] = useState(false);


    if (props.isLogin === false) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className="transaction-history-container">
                <div className="transaction-history-wrapper">
                    <div className="movie-manager">
                        <div className="title1">
                            <ListAltIcon />
                            <h1>TRANSACTION HISTORY_</h1>
                        </div>
                        <div className="table-content">
                            <TableTransactionHistory
                                transactions={transactions}
                                setSelectedRow={setSelectedRow}
                                modalRemove={modalRemove}
                                setModalRemove={setModalRemove}
                            />
                        </div>
                    </div>
                </div>

                <ModalRemove
                    modalRemove={modalRemove}
                    setModalRemove={setModalRemove}
                    action={removeTransHandler}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    text={`Are your sure want to remove this transaction?`}
                />

                <Footer />
            </div>
        )
    }
}


export default TransactionHistory;