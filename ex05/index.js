const { EventEmitter } = require('events')
// ! 暗号：搜索算法
module.exports = class Connection {
    constructor() {
        this.emitter = new EventEmitter()
    }
    // 注册链接事件
    onConn(cb) {
        this.emitter.on("connection", cb)
    }
    // 触发链接事件
    connection(params) {
        this.emitter.emit("connection", params)
    }
}
