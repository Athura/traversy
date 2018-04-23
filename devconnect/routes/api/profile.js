const express = require('express');
const router = express.Router();

// don't need api/profile because we already did it over in server.js
// automatically serve a 200 status
// @route GET api/profile/test
// @description Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: "Profile Works"
}));

module.exports = router;