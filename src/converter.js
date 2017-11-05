const fs = require('fs');
const path = require('path');

module.exports = {
    csvToJson: csvToJson,
    jsonToCsv: jsonToCsv,
    getMedical: getMedical
};

function csvToJson(filename) {
    let file = readFile(filename);
    let headers = extractHeaders(file);
    let json = [];
    file.forEach(function(item) {
        let tmp = {};
        let row = item.split(",");
        for(let i = 0; i < headers.length; i++) {
            tmp[headers[i]] = row[i];
        }
        json.push(tmp);
    });
    return json;
}

function getMedical(id, filename) {
    let all = csvToJson(filename);
    for (let index in all) {
        if (all[index].id === id) return all[index];
    }
    return {};
}

function jsonToCsv(json, filename) {
    let file = readFile(filename);
    let headers = extractHeaders(file);
    try {
        let res = [];
        for (let i = 0; i < headers.length; i++) {
            let key = headers[i];
            if (key in json) {
                res.push(json[key]);
            } else {
                throw new Error(key + ' should be exist');
            }
        }
        saveFile(res.join(','), filename);
    } catch (e) {
        return 'Failed to parse new medical: ' + e.message;
    }
    return 'New medical was successfully added';
}

function readFile(filename) {
    return fs.readFileSync(getFilePath(filename), { encoding: 'utf-8' },
        function (err) {
            console.log(err);
        })
        .split('\n');
}

function saveFile(data, filename) {
    console.log(data)
    console.log(getFilePath(filename))
    fs.appendFile(getFilePath(filename), data, function(err) {
        if (err) {
            console.log(err);
            return 'Failed to save data';
        }
    });
}

function getFilePath(filename) {
    return path.join(__dirname, '../resource/' + filename);
}

function extractHeaders(file) {
    return file.shift().split(",");
}