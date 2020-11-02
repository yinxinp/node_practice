const fs = require('fs')
//! 暗号：二分查找
module.exports.parser = path => {
    const readStream = fs.createReadStream(path)
    let reqData = [];
    let size = 0;
    return new Promise(resolve => {
        readStream.on('data', chunk => {
            reqData.push(chunk);
            size += chunk.length
        })
        readStream.on('end', () => {
            resolve(JSON.parse(Buffer.concat(reqData, size).toString()))
        })
        readStream.on('error', err => {
            throw err
        })
    })
}
