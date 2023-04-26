const PremissFile = require('../DALS/jsonPremissionsDAL')

const getAllPremissJson = async () => {
    const { permissions } = await PremissFile.getPremissJSON()
    return permissions
}

const getPremissByIdJson = async (id) => {
    const permissions = await getAllPremissJson()
    let permission = permissions.find((perm) => perm.id === id)
    if (permission) return permission
    return 'user not found'
}

const addPremissJson = async (obj) => {
    const permissions = await getAllPremissJson()
    permissions.push(obj)
    await PremissFile.setPremissJSON({ "permissions": permissions })
    return true
}
// method get array of objects
const addBlockPremissJson = async (arr) => {
    await PremissFile.setPremissJSON({ "permissions": arr })
    return true
}

// update ONLY the userPremiss array ***
const updatePremissJson = async (id, obj) => {
    const permissions = await getAllPremissJson()
    const permIndex = permissions.findIndex(perm => perm.id === id)
    if (permIndex != -1) {
        permissions[permIndex].userPremiss = obj.userPremiss
        return await PremissFile.setPremissJSON({ "permissions": permissions })
    } else {
        return 'user not found'
    }
}
const deletePremissJson = async (id) => {
    const permissions = await getAllPremissJson()
    const updatePermissions = permissions.filter((user) => user.id !== id)
    return await PremissFile.setPremissJSON({ "permissions": updatePermissions })
}



module.exports = { getAllPremissJson, getPremissByIdJson, addPremissJson, updatePremissJson, deletePremissJson, addBlockPremissJson }