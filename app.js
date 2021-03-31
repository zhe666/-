// 创建express服务器并开始监听
const express =require("express")
const server=express()

// 开启监听
server.listen(3000,()=>{
    console.log("服务器已经在3000端口就绪");
})