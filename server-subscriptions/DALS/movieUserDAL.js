const axios = require('axios')
const getAllmoviesFirstTime = async () => {
    return await axios.get('https://api.tvmaze.com/shows')
}
const getAllUsersFirstTime = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users')
}

module.exports = { getAllmoviesFirstTime, getAllUsersFirstTime }