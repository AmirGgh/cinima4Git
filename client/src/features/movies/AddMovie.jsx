import MovieBar from './MovieBar'
import { Box, Modal } from '@mui/material'
import GenericForm from '../../utils/genericForm'
import { styleModal } from '../../utils/theme'
import { useAddNewMovieMutation } from './moviesSlice'

export default function AddMovie({ handleClose, open }) {
    const fields = [
        { label: 'movie name', name: 'name', type: 'text' },
        { label: 'genres', name: 'genres', type: 'text' },
        { label: 'image(link)', name: 'image', type: 'text' },
        { label: 'premiered', name: 'premiered', type: 'text' },
    ]
    const movie = {
        name: '', genres: [], image: '', premiered: ''
        , summary: ''

    }
    const [addNewMovie] = useAddNewMovieMutation()
    const addThisMovie = async (data) => {
        if (data.genres) data.genres = data.genres.split(",")
        if (data) {
            try {
                await addNewMovie({ id: movie._id, body: data }).unwrap()

            } catch (err) {
                console.error('Failed to add the movie', err)
            }
        }
        handleClose()
    }

    return (
        <Modal open={open}
            onClose={handleClose}>
            <Box sx={styleModal}  >
                <MovieBar />
                <GenericForm typeForm={"Add"} fields={fields} ditails={movie} movie={true} onSubmit={addThisMovie} />
            </Box>
        </Modal>

    )
}
