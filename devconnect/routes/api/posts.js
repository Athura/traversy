const express = require('express');
const router = express.Router();

// don't need api/posts because we already did it over in server.js
// automatically serve a 200 status
// @route GET api/posts/test
// @description Tests post route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: "Post Works"
}));

module.exports = router;