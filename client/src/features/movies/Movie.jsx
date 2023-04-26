import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import { useGetMoviesQuery } from './moviesSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import MovieDisplay from './MovieDisplay';
import { useState } from 'react';
import EditMovie from './EditMovie';
import MovieSubs from './MovieSubs';
import { styleModal } from '../../utils/theme';



const Movie = ({ movieId, editPer, viewSubsPer, delPer }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { movie } = useGetMoviesQuery('getMovies', {
        selectFromResult: ({ data }) => ({
            movie: data?.entities[movieId]
        }),
    })
    const [showMovie, setShowMovie] = useState(false)
    const [editMovie, setEditMovie] = useState(false)
    const [membersWached, setMembersWached] = useState(false)
    const memberWac = () => {
        setMembersWached(!membersWached)
    }
    const show = () => {
        setShowMovie(!showMovie)
    }
    const edit = () => {
        setEditMovie(!editMovie)
    }
    let content
    if (movie?.subsWatches) {
        content = movie.subsWatches.map((memb) => (
            <MovieSubs key={memb.memberID} id={memb.memberID} date={memb.date} />
        ))
    }
    return (
        <Card sx={{
            my: 1,
            mx: 1,
        }} >
            <CardMedia
                component="img"
                sx={{ height: { xs: 260, sm: 360 }, width: { xs: 260, sm: 260 } }}
                image={movie.image}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Typography  >{movie.name}</Typography >
                </CardContent>

                <CardActions >
                    <Button size="small" variant='outlined' onClick={show}>show summery</Button>
                    <MovieDisplay show={show} showMovie={showMovie} movie={movie} />
                    {editPer && <Button size="small" variant='outlined' onClick={edit}>Edit movie</Button>}
                    {editPer && <EditMovie key={movie.image} edit={edit} editMovie={editMovie} movie={movie} delPer={delPer} />}
                </CardActions>
                <CardActions>
                    {isMobile && movie.subsWatches?.length > 0 && <Button size="small" variant='outlined' onClick={memberWac}>Members wached</Button>}

                </CardActions>

                {isMobile ?
                    <Modal open={membersWached} onClose={memberWac}>
                        <Box sx={styleModal}  ><Typography >Members wached:</Typography >{content && content}</Box>
                    </Modal>
                    : movie.subsWatches?.length > 0 && viewSubsPer && <CardContent sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        maxWidth: 220,
                        borderRadius: 3,
                        fontSize: '10rem'
                    }}>
                        <Typography >Members wached:</Typography >
                        {content && content}

                    </CardContent>
                }
            </Box>
        </Card>
    )
}

export default Movie