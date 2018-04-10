'use strict';
const express = require('express');
const router = express.Router();

/* GET index */
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));    
});

module.exports = router;
