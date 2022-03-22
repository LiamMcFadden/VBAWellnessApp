const router = require("express").Router();

router.get('/', (req, res) => {
    res.send({ 'success': 'Hello from server:/auth' })
})

module.exports = router