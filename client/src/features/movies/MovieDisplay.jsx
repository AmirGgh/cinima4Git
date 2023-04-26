import { Box, Chip, Modal, Typography, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/system'

export default function MovieDisplay({ show, showMovie, movie }) {
    const isMobile = useMediaQuery('(min-width:470px)');

    return (
        <Modal open={showMovie} onClose={show}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                }}
                onClick={show}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: { xs: '90%', lg: '80%', xl: '60%' },
                        height: { xs: '80%', lg: '70%', xl: '50%' },
                        backgroundColor: 'black',
                        boxShadow: 24,
                        borderRadius: 1,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {isMobile && <Box
                        sx={{
                            width: '35%',
                            height: '100%',
                            backgroundImage: `url(${movie.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: '65%',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: 3,
                        }}
                    />}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: {
                                sm: '35%', xs: '0%'
                            },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 3,
                        }
                        }
                    >
                        <Typography variant="h5" component="h2" gutterBottom>
                            {movie.name}
                        </Typography>
                        <br />

                        <Typography variant="body3" component="p" gutterBottom>
                            {movie.premiered}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {movie.summary}
                        </Typography>
                        <br />
                        <Stack direction="row" spacing={1}>

                            {movie?.genres.map((g) => (< Chip key={g} label={g} variant="outlined" />))}

                        </Stack>

                    </Box>

                </Box>
            </Box>
        </Modal >
    )
}


// backgroundImage: `url(${movie.image})`,
// backgroundSize: 'cover',
// backgroundPosition: 'center',
// backgroundColor: 'rgba(0, 0, 0, 0.5)',

