const express = require('express');
const router = express.Router();
const userHendler   = require('../handler/user');


router.get('/:id', userHendler.getUser);
router.get('/', userHendler.getUsers); 
router.post('/', userHendler.register);
router.put('/:id', userHendler.update);
router.post('/login', userHendler.login);
router.post('/logout', userHendler.logout);

module.exports = router;
