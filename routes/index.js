var express = require('express')
var router = express.Router()

router.get('/status', require('./status'))

router.use('/stations', require('./stations'))

module.exports = router
