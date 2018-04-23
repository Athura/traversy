const express = require('express');
const router = express.Router();

// don't need api/users because we already did it over in server.js
// automatically serve a 200 status
// @route GET api/users/test
// @description Tests users route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));

module.exports = router;