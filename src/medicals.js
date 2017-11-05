const express = require('express');
const router = express.Router();

const convert = require("./converter");

router.get('/', function(req, res) {
    res.send(convert('MOCK_DATA.csv'));
});

module.exports = router;