import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';

//Components
import TablePaginationActions from './TablePaginationAction';

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



function TableMovieAdm({ movies, editMovie, setSelectedRow, modalRemove, setModalRemove }) {

    const [isEdit, setIsEdit] = useState(false);
    const [rowEdit, setRowEdit] = useState(null);

    const initialStateMovie = { name: '', genre: '', director: '', duration: '', synopsis: '', casts: '', image: '' }
    const [movieInput, setMovieInput] = useState(initialStateMovie)

    const removeDialogue = e => {
        setSelectedRow(parseInt(e.currentTarget.closest("tr").id));
        setModalRemove(!modalRemove);
    }

    const editForm = (e, movie) => {
        let rowId = parseInt(e.currentTarget.closest("tr").id)
        setRowEdit(rowId);
        setIsEdit(true)
        setMovieInput({
            name: movie.name,
            genre: movie.genre.join(', '),
            director: movie.director,
            duration: movie.duration,
            synopsis: movie.synopsis,
            casts: movie.casts.join(', '),
            image: movie.image
        })
    }

    const editHandler = () => {
        console.log(movieInput)
        editMovie(rowEdit, { ...movieInput, genre: movieInput.genre.split(', '), casts: movieInput.casts.split(', ') })
        setIsEdit(false)
        setMovieInput(initialStateMovie)
    }

    //table material
    const columns = [
        { id: 'no', label: '#', minWidth: 50, align: 'center' },
        { id: 'movie-title', label: 'Movie Title', minWidth: 170, align: 'center' },
        { id: 'director', label: 'Director', minWidth: 100, align: 'center' },
        { id: 'image', label: 'Image', minWidth: 100, align: 'center' },
        { id: 'genre', label: 'Genre', minWidth: 100, align: 'center' },
        { id: 'duration', label: 'Duration', minWidth: 100, align: 'center' },
        { id: 'synopsis', label: 'Synopsis', minWidth: 100, align: 'center' },
        { id: 'cast', label: 'Cast', minWidth: 100, align: 'center' },
        { id: 'option', label: 'Option', minWidth: 100, align: 'center' }
    ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //end table material

    const renderRow = (movie, index) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={movie.id} id={movie.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell><b>{movie.name}</b></TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell><img className="movie-img" src={movie.image} alt={movie.name} /></TableCell>
                <TableCell>{movie.genre.join(', ')}</TableCell>
                <TableCell>{movie.duration} Minutes</TableCell>
                <TableCell>{movie.synopsis.split(' ').slice(0, 10).join(' ')}...</TableCell>
                <TableCell>{movie.casts.join(', ')}</TableCell>
                <TableCell className="option-container"><Button variant='outlined' onClick={e => editForm(e, movie)}>EDIT</Button><Button variant='contained' color="secondary" onClick={removeDialogue}>REMOVE</Button></TableCell>
            </TableRow>
        )
    }

    const renderRowEdit = (movie, index) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={movie.id} id={movie.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <TextField autoFocus margin="dense" id="movie-title" label='Movie Title' multiline rows="4" fullWidth variant='outlined'
                        value={movieInput.name}
                        onChange={e => setMovieInput({ ...movieInput, name: e.target.value })}
                    />
                </TableCell>
                <TableCell>
                    <TextField margin="dense" id="director" label='Director' multiline rows="4" fullWidth variant='outlined'
                        value={movieInput.director}
                        onChange={e => setMovieInput({ ...movieInput, director: e.target.value })}
                    />
                </TableCell>
                <TableCell>
                    <TextField margin="dense" id="image" label='Image URL' multiline rows="4" fullWidth variant='outlined'
                        value={movieInput.image}
                        onChange={e => setMovieInput({ ...movieInput, image: e.target.value })}
                    />
                </TableCell>
                <TableCell>
                    <TextField margin="dense" id="genre" label='Genre (separate with , and space)' multiline rows="4" fullWidth variant='outlined'
                        value={movieInput.genre}
                        onChange={e => setMovieInput({ ...movieInput, genre: e.target.value })}
                    />
                </TableCell>
                <TableCell>
                    <TextField margin="dense" id="duration" label='Duration (in minutes)' multiline rows="4" fullWidth variant='outlined'
                        value={movieInput.duration}
                        onChange={e => setMovieInput({ ...movieInput, duration: e.target.value })}
                    />
                </TableCell>
                <TableCell>
                    <TextField margin="dense" id="synopsis" label='Synopsis' multiline rows="4" fullWidth variant='outlined'
                        value={movieInput.synopsis}
                        onChange={e => setMovieInput({ ...movieInput, synopsis: e.target.value })}
                    />
                </TableCell>
                <TableCell>
                    <TextField margin="dense" id="cast" label='Casts (separate with , and space)' multiline rows="4" fullWidth variant='outlined'
                        value={movieInput.casts}
                        onChange={e => setMovieInput({ ...movieInput, casts: e.target.value })}
                    />
                </TableCell>
                <TableCell className="option-container"><Button variant='outlined' onClick={() => setIsEdit(false)}>CANCEL</Button><Button variant='contained' color="secondary" onClick={editHandler}>SAVE</Button></TableCell>
            </TableRow>
        )
    }


    //!MAIN RENDER ---------------------------------------------------/
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie, index) => (
                        isEdit && rowEdit === index + 1 ? renderRowEdit(movie, index) : renderRow(movie, index)
                    ))}
                </TableBody>
            </Table>
            <table>
                <tbody>
                    <tr>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={movies.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TableMovieAdm;