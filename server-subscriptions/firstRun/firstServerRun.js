const { models } = require("mongoose")
const { getAllMembers } = require("../BLL/membersBLL")
const { getAllMovies } = require("../BLL/moviesBLL")

const firstServerRun = () => {
    getAllMembers()
    getAllMovies()
}

module.exports = { firstServerRun }