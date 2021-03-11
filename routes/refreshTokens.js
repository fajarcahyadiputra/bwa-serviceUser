const router = require('express').Router();
const {create, getToken} = require('../handler/refreshTokens');

router.post('/', create);
router.get('/', getToken);

module.exports = router;