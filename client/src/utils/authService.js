import axios from 'axios';

const login = async (username, password) => {
    return await axios.post('http://localhost:8000/auth/login', { username, password })
}

const setPermissions = async (id) => {
    const p = await axios.get(`http://localhost:8000/jsonPremi/${id}`)
    sessionStorage["userPermissions"] = p.data.userPremiss
    return p.data.userPremiss
}

const getPermissions = () => {
    return sessionStorage["userPermissions"]?.split(',')
}
const saveToken = (token) => {
    sessionStorage["token"] = token
}
const getToken = () => {
    return sessionStorage["token"]
}
const saveId = (id) => {
    sessionStorage["id"] = id
}
const getId = () => {
    return sessionStorage["id"]
}
const saveRole = (role) => {
    sessionStorage["role"] = role
}
const getRole = () => {
    return sessionStorage["role"]
}

const reset = () => {
    sessionStorage.clear()
}
export default { login, saveToken, getToken, saveId, getId, saveRole, getRole, reset, setPermissions, getPermissions }