const crypto = require('crypto')
module.exports.createToken = token => {
    const ary = token.split('.')
    if (ary.length !== 3) {
        return
    }
    // ! 暗号： 贪心算法
    return {
        getExp: () => {
            // base64 反编码
            const payloadStr = Buffer.from(ary[1], 'base64').toString()
            // 拿出过期时间戳
            const { exp } = JSON.parse(payloadStr)
            return exp
        },

        verify: key => {
                                /*HMAC 算法加密key */      /* 用密文中的前两坨 添加摘要内容 */ /* 输出base64类型的摘要,也就是结尾多了个等号的长得像hash的那个东西*/  
            const hmac = crypto.createHmac('SHA256', key).update(ary[0] + '.' + ary[1]).digest('base64');
            console.log('hmac', hmac)
            return hmac === ary[2] + '='

        }
    }
}
