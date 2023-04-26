import { Button, Card, CardActions, CardContent, Typography, Select, FormControl, InputLabel, MenuItem, Box } from '@mui/material';

import { useState } from 'react';
import { useGetSubscriptionsQuery, useGetMembersQuery, useAddNewSubscriptionMutation, useUpdateSubscriptionsMutation } from './subscriptionsSlice'
import { useGetMoviesQuery, useUpdateSubsMovieMutation } from '../movies/moviesSlice';
import MoviesWatched from './MoviesWatched';
import Loading from '../../components/Loading';
import { dateDDMMYY } from '../../utils/dateDDMMYY';

const MovieList = ({ newSubs, memberID, subscriptionWatched }) => {
    const {
        data: movies,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetMoviesQuery('getMovies')
    const [newSubscribe] = useAddNewSubscriptionMutation()// in subscriptions
    const [updateSubscribe] = useUpdateSubscriptionsMutation()// in subscriptions
    const [updateMovieSubscriptions] = useUpdateSubsMovieMutation() // in movie

    const [newMovie, setNewMovie] = useState();

    const handleChange = (event) => {
        setNewMovie(event.target.value);
    };

    // add new movie id to exist array/ create new array 
    const subscribeMovie = async () => {
        let date = dateDDMMYY()
        if (newMovie) {
            if (!subscriptionWatched?.memberID) {
                try {
                    const subs = await newSubscribe({ id: newMovie, body: { memberID, movieWatched: [{ movieID: newMovie, date }] } }).unwrap()
                    if (subs) {
                        await updateMovieSubscriptions({ id: newMovie, body: { memberID, date } }).unwrap()
                    }
                } catch (err) {
                    console.error('Failed to edit the subscribe', err)
                }
            } else {
                try {
                    const subs = await updateSubscribe({ id: subscriptionWatched._id, body: { movieID: newMovie, date } }).unwrap()
                    if (subs) {
                        await updateMovieSubscriptions({ id: newMovie, body: { memberID, date } }).unwrap()
                    }
                } catch (err) {
                    console.error('Failed to edit the subscribe', err)
                }
            }
        }
        newSubs()
    }

    let content;
    if (isLoading) {
        content = <Loading />
    }


    const filterMovieIds = movies?.ids.filter((id) => !subscriptionWatched?.movieWatched?.find((mWatch) => mWatch.movieID === id))

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">New Movie</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={newMovie}
                    label="Movie"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>{newMovie}</em>
                    </MenuItem>
                    {
                        filterMovieIds?.map((id, index) => (<MenuItem key={index} value={id}>{movies.entities[id].name}</MenuItem>))
                    }

                </Select>
            </FormControl>
            <br />
            <Button onClick={newSubs}>cancel</Button>
            <Button onClick={subscribeMovie}>subscribe</Button>
        </Box>
    );
}
//------------------------------------------------------------------------------------------------------------------------------------------
const Subscription = ({ id, editPer, viewSubsPer }) => {
    const { member } = useGetMembersQuery('getMembers', {
        selectFromResult: ({ data }) => ({
            member: data?.entities[id]
        }),
    })
    const { subscription, isError,
        error, } = useGetSubscriptionsQuery('getSubscriptions', {
            selectFromResult: ({ data }) => ({
                subscription: data?.entities[member._id]
            }),
        })
    const [newSubscribe, setNewSubscribe] = useState(false)
    if (isError) {
        return <p>{error}</p>;
    }

    const newSubs = () => {
        setNewSubscribe(!newSubscribe)
    }

    let content
    if (subscription?.movieWatched) {
        content = subscription.movieWatched.map((movie, index) => <MoviesWatched date={movie.date} key={movie.movieID} id={movie.movieID} />)
    }
    return (
        <Card sx={{
            my: 1,
            mx: 1
        }}
            key={member._id}>
            <CardContent>
                <Typography > Member Name: {member.firstName} {member.lastName}</Typography >
                <Typography > Email: {member.email}</Typography >
                <Typography > City: {member.city}</Typography >
                <hr />
                {editPer && <CardActions>
                    {!newSubscribe && <Button size="small" onClick={newSubs}>subscribe to new movie</Button>}
                    {newSubscribe && <MovieList newSubs={newSubs} memberID={id} subscriptionWatched={subscription} />}
                </CardActions>}
                {viewSubsPer &&
                    <>
                        Movies Watched: {content && content}
                    </>
                }
            </CardContent>
        </Card >
    )
}

export default Subscription

