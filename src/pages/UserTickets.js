import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';


//redux
import { useSelector, useDispatch } from 'react-redux';
import { getLocal } from '../redux/allAction';
//components
import Footer from '../components/Footer';
import ModalDetailTicket from '../components/ModalDetailTicket';



function UserTickets() {

    // Formatter Rupiah
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2
    });
    const alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    const dispatch = useDispatch();
    const user = useSelector(state => state.userData.user);
    const isLogin = useSelector(state => state.userData.isLogin);
    const myTransactions = useSelector(state => state.userData.transactions);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalDetail, setModalDetail] = useState(false);

    const detailHandler = sel => {
        let tranIdx = myTransactions.findIndex(a => a.id === sel)
        setSelectedRow(tranIdx);
        setModalDetail(!modalDetail);
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
                    <div className="active-tickets-container">
                        <h1>My Ticket Transactions</h1>
                        {myTransactions.map(tran => {
                            return (
                                <div key={tran.id} className="active-tickets">
                                    <div className="info-container">
                                        <h1>Date Purchased: {tran.date}</h1>
                                        <p>Time: {tran.hours}:{tran.minutes}</p>
                                    </div>
                                    <div className="ticket-container">
                                        <p>Total Price: {formatter.format(tran.totalPrice)}</p>
                                        <p>Ticket Amount: {tran.ticketAmount}</p>
                                    </div>
                                    <div className="button-container">
                                        <Button onClick={() => detailHandler(tran.id)}>DETAIL</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Footer />

                <ModalDetailTicket
                    show={modalDetail}
                    setShow={setModalDetail}
                    alf={alf}
                    myTransactions={myTransactions}
                    selectedRow={selectedRow}
                    formatter={formatter}
                    setSelectedRow={setSelectedRow}
                />
            </div>
        )
    }
}


export default UserTickets;
