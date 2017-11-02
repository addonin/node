var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/main');
});

router.get('/main', function (req, res) {
   res.send('Hello!');
});

module.exports = router;