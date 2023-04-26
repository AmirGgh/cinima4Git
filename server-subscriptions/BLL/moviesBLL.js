const { getAllmoviesFirstTime } = require('../DALS/movieUserDAL');
const { Movie } = require('../models/allModels');
const { updateSubscriptionByMemberId } = require('./subscriptionsBLL');

// GET - Get All - Read
const getAllMovies = async () => {
  const count = await Movie.countDocuments({});
  if (count === 0) {
    const { data } = await getAllmoviesFirstTime()
    for (let mov of data) {
      mov = { ...mov, image: mov.image.medium }
      mov.summary = mov.summary.replace(/<\/?p>/g, '').replace(/<\/?b>/g, '').replace(/,/g, '').replace(/<\/?i>/g, '')
      const movieModel = new Movie(mov);
      await movieModel.save();
    }
  }
  let movies = await Movie.find({})
  return movies
};

// GET - Get By Id - read
const getMovieById = async (id) => {
  return await Movie.findById({ _id: id });
};

// POST - Create
const addMovie = async (obj) => {
  const mov = new Movie(obj);
  await mov.save();
};

// PUT - Update
const updateMovie = async (id, obj) => {
  await Movie.findByIdAndUpdate(id, obj);
};

const updateSubsWatches = async (id, obj) => {
  await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { subsWatches: obj } },
    { new: true }
  );
}
// DELETE - Delete
const deleteMovie = async (id) => {
  let subs = await getMovieById(id)
  subs?.subsWatches?.forEach(member => {
    updateSubscriptionByMemberId(member.memberID, id)
  });
  await Movie.findByIdAndDelete(id);
};

const updateMovieByMemberId = async (movieWatched, memberID) => {
  movieWatched.forEach(async (movie) => {
    let movieUpdate = await getMovieById(movie.movieID)
    movieUpdate = movieUpdate.subsWatches.filter((memberSub) => memberSub.memberID != memberID)
    await updateMovie(movie.movieID, { subsWatches: movieUpdate })
  })
};
module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  updateSubsWatches,
  deleteMovie,
  updateMovieByMemberId
};
