const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt =require('jsonwebtoken')
router.use(express.urlencoded())



module.exports = router

// 获取用户基本信息
router.get("/userinfo",(req,res)=>{
    const {username}=req.body
    console.log(username);
    // 拼接字符串
    const sqlStrSelect=`select * from users where uesername="${username}"`
    conn.query(sqlStrSelect,(err,result)=>{
        //说明查询错误
        if(err){
            console.log(err);
            res.json({status:500,msg:"服务器错误"})
            return
        }
        res.json({
            status:0,msg:"获取用户基本信息成功",
            data:result[0]

        })
    })
})