const jsonfile = require('jsonfile')
const file = './data/usersData.json'
const getUserJSON = async () => {
    return await jsonfile.readFile(file)
}
const setUserJSON = async (act) => {
    await jsonfile.writeFile(file, act)
    return "Done"
}
module.exports = { getUserJSON, setUserJSON }