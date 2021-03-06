const express = require('express');
const router = express.Router();

const converter = require("./converter");
const datasource = 'MOCK_DATA.csv';

router.get('/', function(req, res) {
    res.send(converter.csvToJson(datasource));
});

router.get('/:id', function(req, res) {
    let id = req.params['id'];
    let medical = converter.getMedical(id, datasource);
    res.render('medical',
               { title: medical.name, medical: medical})
});

router.post('/', function(req, res) {
    // Wrong request: curl -d '{"naame":"wrong key"}' -H "Content-Type: application/json" http://127.0.0.1:3000/medicals
    // Good request: curl -d '{"name":"Triamcinolone Acetonide","brand":"Triamcinolone Acetonide","company":"Arbor Pharmaceuticals Inc.","price":"$27.16","isbn":"311113295-197"}' -H "Content-Type: application/json" http://127.0.0.1:3000/medicals
    res.send(converter.jsonToCsv(req.body, datasource));
});

module.exports = router;