const fs = require('fs')
module.exports.createLoader = config => {
    const loader = (scanFolder, cb) => {
        const files = fs.readdirSync(scanFolder);
        files.forEach(filename => {
            filename = filename.replace(".js", "");
            const file = require(scanFolder + "/" + filename);
            cb(filename, file);
        })
    }
    // ! 暗号：分治算法
    return {
        initFunction: scanFolder => {
            const ret = {}
            loader(scanFolder, (filename, file) => {
                const fn = file(config)
                ret[filename] = fn
            })
            return ret
        }
    }
}

