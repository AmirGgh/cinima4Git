const jsonfile = require('jsonfile')
const file = './data/PermissionsData.json'
const getPremissJSON = async () => {
    return await jsonfile.readFile(file)
}
const setPremissJSON = async (act) => {
    await jsonfile.writeFile(file, act)
    return "Done"
}
module.exports = { getPremissJSON, setPremissJSON }