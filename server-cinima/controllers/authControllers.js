const express = require('express')
const jwt = require('jsonwebtoken');
const { getPremissByIdJson } = require('../BLL/premissionsJsonBLL');
const { getAllUsers } = require('../BLL/usersBLL');
const { getUserByIdJson } = require('../BLL/userJsonBLL');
const router = express.Router();

router.post('/login', async (req, res) => {
    ////// --------------- get by user name => password
    const users = await getAllUsers()
    const username = req.body.username
    const password = req.body.password
    const validUser = users.find((user) => user.username === username && user.password === password)
    //valid name & password
    if (validUser) {
        //find user id or username
        const userID = validUser.id
        const userJSON = await getUserByIdJson(userID)
        const permiss = await getPremissByIdJson(userID)

        // get the secret key 
        const private_key = 'somekey'

        const tokenData = jwt.sign({ id: userID, role: validUser.username, permissions: permiss.userPremiss },
            private_key,
            { expiresIn: userJSON.SessionTimeOut } // 2h
        )
        res.status(200).send({ token: tokenData, id: userID, role: validUser.username })
    } else {
        res.sendStatus(401)
    }
})
module.exports = router;
