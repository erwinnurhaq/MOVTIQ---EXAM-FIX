import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


function ModalAdd({ modalAdd, setModalAdd, addMovie }) {

    const initialState = { name: '', genre: '', director: '', duration: '', synopsis: '', casts: '', image: '' }
    const [movieInput, setMovieInput] = useState(initialState)

    const addHandler = () => {
        let isNotBlankForm = true;
        for (let i in movieInput) {
            if (movieInput[i] === '') {
                isNotBlankForm = false;
            }
        }
        if (isNotBlankForm) {
            addMovie({ ...movieInput, genre: movieInput.genre.split(', '), casts: movieInput.casts.split(', ') })
            setModalAdd(!modalAdd)
            setMovieInput(initialState)
        } else {
            alert('Please fill all the required forms')
        }
    }

    return (
        <Dialog open={modalAdd} onClose={() => setModalAdd(!modalAdd)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
            <DialogTitle id="form-dialog-title">ADD NEW MOVIE</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill new movie description below:</DialogContentText>
                <TextField autoFocus margin="dense" id="movie-title" label="Movie Title" type="text" fullWidth
                    value={movieInput.name}
                    onChange={e => setMovieInput({ ...movieInput, name: e.target.value })}
                />
                <TextField margin="dense" id="director" label="Director" type="text" fullWidth
                    value={movieInput.director}
                    onChange={e => setMovieInput({ ...movieInput, director: e.target.value })}
                />
                <TextField margin="dense" id="cast" label="Cast" type="text" fullWidth
                    value={movieInput.casts}
                    onChange={e => setMovieInput({ ...movieInput, casts: e.target.value })}
                />
                <TextField margin="dense" id="image" label="Image URL" type="text" fullWidth
                    value={movieInput.image}
                    onChange={e => setMovieInput({ ...movieInput, image: e.target.value })}
                />
                <TextField margin="dense" id="genre" label="Genre" type="text" fullWidth
                    value={movieInput.genre}
                    onChange={e => setMovieInput({ ...movieInput, genre: e.target.value })}
                />
                <TextField margin="dense" id="duration" label="Duration" type="text" fullWidth
                    value={movieInput.duration}
                    onChange={e => setMovieInput({ ...movieInput, duration: e.target.value })}
                />
                <TextField margin="dense" id="synopsis" label="Synopsis" multiline rows="4" fullWidth
                    value={movieInput.synopsis}
                    onChange={e => setMovieInput({ ...movieInput, synopsis: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setModalAdd(!modalAdd)} >Cancel</Button>
                <Button onClick={addHandler} variant='contained' color="secondary">Save</Button>
            </DialogActions>
        </Dialog>

    )
}

export default ModalAdd;