const userFile = require('../DALS/jsonUserDAL')

const getAllUsersJson = async () => {
    const { users } = await userFile.getUserJSON()
    return users
}

const addUserJson = async (obj) => {
    const users = await getAllUsersJson()
    obj.CreatedDate = new Date().toUTCString()
    users.push(obj)
    await userFile.setUserJSON({ "users": users })
    return true
}
// method get array of objects
const addBlockUserJson = async (arr) => {
    await userFile.setUserJSON({ "users": arr })
    return true
}
const getUserByIdJson = async (id) => {
    const users = await getAllUsersJson()
    let getUser = users.find((user) => user.id === id)
    if (getUser) return getUser
    return 'user not found'
}
// update the all the user fild ***
const updateUserJson = async (id, obj) => {
    const users = await getAllUsersJson()
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex != -1) {
        users[userIndex] = obj
        return await userFile.setUserJSON({ "users": users })
    } else {
        return false
    }
}
const deleteUserJson = async (id) => {
    const users = await getAllUsersJson()
    const updateUsers = users.filter((user) => user.id !== id)
    return await userFile.setUserJSON({ "users": updateUsers })
}



module.exports = { getAllUsersJson, getUserByIdJson, updateUserJson, deleteUserJson, addUserJson, addBlockUserJson }