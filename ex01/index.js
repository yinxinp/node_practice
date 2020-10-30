const { resolve } = require('path')
const fs = require('fs')
module.exports.getRouter = (path = resolve('./')) => {
    // ! 暗号：递归
    // 生成可供处理的动态部分数据结构 
    const routes = fs.readdirSync(path).map(v => {
        const name = v.replace(".vue", "").toLowerCase()
        return {
            path: `'${"/" + name}'`,
            name: `'${name}'`,
            component: `() => import('./views/${v}')`
        }
    })
    return generateRouter(routes)
    /**
     * 生成路由字符串
     * @param {*} routes 路由们
     */
    function generateRouter(routes) {
        return `
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
${routes.map(route =>
            `{
    path: ${route.path},
    name: ${route.name},
    component: ${route.component}
},
`).join("")
            }
    ]
})`
    }
}

