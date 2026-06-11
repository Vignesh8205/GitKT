const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../test-data/sharedData.json');

function saveData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function readData() {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(filePath));
}

module.exports = { saveData, readData };
