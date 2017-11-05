const fs = require('fs');
const path = require('path');

function csvToJson(filename) {
    const filePath = path.join(__dirname, '../resource/' + filename);
    let file = fs.readFileSync(filePath, { encoding: 'utf-8' },
                               function (err) {
                                   console.log(err);
                               })
                 .split('\n');
    let headers = file.shift().split(",");
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

module.exports = csvToJson;