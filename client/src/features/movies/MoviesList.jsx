import { Grid } from '@mui/material';
import Movie from './Movie';
import { useGetMoviesQuery } from './moviesSlice';

import Loading from '../../components/Loading';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { validPermission } from '../../utils/permissionsUI';
import MovieBar from './MovieBar';
const MoviesList = () => {
    const { currPermissions } = useContext(AppContext)
    const {
        data: movies,
        isLoading,
        isSuccess,
    } = useGetMoviesQuery('getMovies')
    const editPer = validPermission("Update Movies", currPermissions)
    const viewSubsPer = validPermission("View Subscriptions", currPermissions)
    const addPer = validPermission("Create Movies", currPermissions)
    const delPer = validPermission("Delete Movies", currPermissions)
    let content;
    if (isLoading) {
        content = <Loading />
    }
    else if (isSuccess) {
        content = movies.ids.map(movieId => <Movie key={movieId} movieId={movieId} editPer={editPer} viewSubsPer={viewSubsPer} delPer={delPer} />)
    }

    return (
        <Grid container display="flex" spacing={1}  >
            {addPer && <MovieBar />}
            {content}
        </Grid>
    )
}
export default MoviesList