// 创建express服务器并开始监听
const express =require("express") //引入模块
const server=express()
const cors=require('cors') 
server.use(cors())
// 设置uploads为静态资源目录
server.use('/uploads',express.static('uploads'))
// 开启监听
server.listen(3000,()=>{
    console.log("服务器已经在3000端口就绪");
})
