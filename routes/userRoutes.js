const express = require('express');
const {getUsers, getUser, createUser, updateUser, deleteUser} = require("../controllers/userController");


//require object
const router = express.Router()

// routes

//Get all user LIST || GET
router.get('/users', getUsers);
//Get Users By ID
router.get('/user/:id',getUser);
//Create student || post
router.post('/create', createUser);
//UPDATE Student
router.put('/update/:id', updateUser);
//Delete user Account
router.delete('/delete/:id',deleteUser);


module.exports = router;
