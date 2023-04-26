const axios = require('axios');
const { User } = require('../models/allModels');
const { addPremissJson, deletePremissJson, addBlockPremissJson } = require('./premissionsJsonBLL');
const { addUserJson, deleteUserJson, addBlockUserJson } = require('./userJsonBLL');
const { getAllUsersFirstTime } = require('../DALS/movieUserDAL');
const url = 'http://localhost:8080'
const options = {
  headers: {
    'Content-Type': 'application/json'
  }
};

//add, update and delete will effect the files: premissionsData.json and users.json
//  Get All - Read - users+jsons
// first start : username=first name, password=last name, sets member values normally, basic premissions and sessions
const getAllUsers = async () => {
  return await User.find({})
};

//  Get By Id - read 
const getUserById = (id) => {
  return User.findById({ _id: id });
};

const createAccount = async (req, res) => {
  let user = await User.findOne({ username: req.username });
  if (!user) {
    return -1
  }
  if (user.password === "---") {
    await updateUser(user._id, { password: req.password })
  } else {
    return -2
  }
};

//  Create
const addUser = async (obj) => {
  const userx = await User.findOne({ username: obj.username })
  if (!userx) {
    const u = new User({ username: obj.username, password: obj.password });
    const user = await u.save()
    if (user) {
      await addUserJson({ id: user.id, ...obj.user })
      await addPremissJson({ id: user.id, ...obj.permissions })
      return user.id
    }
  }
}

let firstRender = false;
//first serves starting
const defineAdmin = async () => {
  // If user collection is empty(first run of the server), insert default admin user and other default users
  const countUser = await User.countDocuments()
  if (!firstRender && countUser === 0) {
    const { data } = await axios.get(`${url}/members`)
    const permissionsArr = []
    const userDataArr = []
    for (let memberWS of data) {
      let user, memberID
      let u = new User({ username: memberWS.firstName, password: memberWS.lastName });
      user = await u.save()
      if (user) {

        permissionsArr.push({ "id": user.id, "userPremiss": ["View Subscriptions", "Update Subscriptions", "View Movies"] })
        userDataArr.push({ "id": user.id, "firstName": memberWS.firstName, "lastName": memberWS.lastName, "SessionTimeOut": 200, "CreatedDate": new Date().toUTCString() })
        // connect user <-> member by ids
        memberID = await axios.put(`${url}/members/${memberWS._id}`, {
          idUser: user.id
        }, options).catch(error => console.log(error));
        updateUser(user.id, { memberID: memberWS._id })
      }
    }
    const u = new User({ username: "admin", password: "ad1234" });
    const user = await u.save()
    if (user) {
      permissionsArr.unshift({ "id": user.id, "userPremiss": ["CRUD Users", "View Subscriptions", "Update Subscriptions", "Delete Subscriptions", "View Movies", "Create Movies", "Update Movies", "Delete Movies"] })
      userDataArr.unshift({ "id": user.id, "firstName": "Admin", "lastName": "a", "SessionTimeOut": 10000, "CreatedDate": new Date().toUTCString() })
    }
    if (permissionsArr.length === 11 && userDataArr.length === 11) {
      await addBlockPremissJson(permissionsArr)
      await addBlockUserJson(userDataArr)
      firstRender = true
    }
  } else {
    console.log("All default users created!"); return;
  }
}

//  Update - username, memberID
const updateUser = async (id, obj) => {
  await User.findByIdAndUpdate(id, obj);
};

// DELETE - Delete db -> user + subscripions,  jsons
const deleteUser = async (id) => {
  deletePremissJson(id)
  deleteUserJson(id)

  await User.findByIdAndDelete(id);
};


module.exports = {
  defineAdmin,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  createAccount
};
