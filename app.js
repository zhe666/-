// 创建express服务器并开始监听
const express =require("express") //引入模块
const server=express()
const cors=require('cors')  //解决跨域问题
server.use(cors())
// 设置uploads为静态资源目录
server.use('/uploads',express.static('uploads'))
// 设置jwt  token生成和验证
const jwt=require("express-jwt")
server.use(juw({
    secret:"az66",// 生成token时候的钥匙，必须统一
    algorithms:['HS256']//加密算法
}).unless({
    path:['/api/login','/api/register', /^\/uploads\/.*/] //除了这两个接口，其他的都需要认证
}))
// 通过路由中间件来加载不同的路由
const userRouter=require("./router/user_router.js")
const accountRouter=require("./router/account_router.js")
const cateRouter=require("./router/cate_router.js")
server.use("/api",accountRouter)
server.use("/my",userRouter)
server.use("/my/article",cateRouter)
// 开启监听
server.listen(3000,()=>{
    console.log("服务器已经在3000端口就绪");
})
