const fs = require('fs-extra')
const dataFilePath = "./data/data.json"

const app = {}
module.exports = app;

app.readJson = (p, callback)=>{
    fs.readJson(dataFilePath, (err, json) => {
        if (err) console.error(err)
        callback(json[p])
    })
}
