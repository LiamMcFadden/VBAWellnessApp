const router = require('express').Router();
const auth = require('./Auth/auth');

router.use('/auth', auth);

module.exports = router