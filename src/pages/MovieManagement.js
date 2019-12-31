import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';
import '../styles/App.scss';

//redux
import { connect } from 'react-redux';
import { deleteMovie, addMovie, editMovie } from '../redux/allAction';

//components
import Footer from '../components/Footer';
import ModalAdd from '../components/ModalAdd';
import ModalRemove from '../components/ModalRemove';
import TableMovieAdm from '../components/TableMovieAdm';



function MovieManagement(props) {

    const [selectedRow, setSelectedRow] = useState(null);
    const [modalRemove, setModalRemove] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);

    if (props.isLogin === false) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className="movie-management-container">
                <div className="movie-management-wrapper">
                    <div className="movie-manager">
                        <div className="title1">
                            <Button variant='contained' color='primary' className="btn-add" onClick={() => setModalAdd(!modalAdd)}><TheatersIcon />ADD MOVIE</Button>
                            <h1>MOVIE DATABASE_</h1>
                        </div>
                        <div className="table-content">
                            <TableMovieAdm
                                movies={props.movies}
                                setSelectedRow={setSelectedRow}
                                editMovie={props.editMovie}
                                modalAdd={modalAdd}
                                setModalAdd={setModalAdd}
                                modalRemove={modalRemove}
                                setModalRemove={setModalRemove}
                            />
                        </div>
                    </div>
                </div>

                <ModalAdd
                    modalAdd={modalAdd}
                    setModalAdd={setModalAdd}
                    addMovie={props.addMovie}
                />

                <ModalRemove
                    modalRemove={modalRemove}
                    setModalRemove={setModalRemove}
                    action={props.deleteMovie}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    text={`Are your sure want to remove this movie?`}
                />

                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.userData.isLogin,
        user: state.userData.user,
        movies: state.movieData.movies
    }
}

export default connect(mapStateToProps, { deleteMovie, addMovie, editMovie })(MovieManagement);