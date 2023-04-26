import { Chip, Typography } from '@mui/material'
import { useState } from 'react';
import MovieDisplay from '../movies/MovieDisplay';
import { useGetMoviesQuery } from '../movies/moviesSlice';


export default function MoviesWatched({ id, date }) {
    const [showMovie, setShowMovie] = useState(false)
    const show = () => {
        setShowMovie(!showMovie)
    }
    const { movie } = useGetMoviesQuery('getMovies', {
        selectFromResult: ({ data }) => ({
            movie: data?.entities[id]
        }),
    })
    let label = `${movie?.name} - ${date}`
    return (
        <div>
            {movie?.name && <Chip label={label} variant="outlined" onClick={show} />}
            {showMovie && <MovieDisplay show={show} showMovie={showMovie} movie={movie} key={id} />
            }
        </div>
    )
}
