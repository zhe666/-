const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt =require('jsonwebtoken')   //创建token
router.use(express.urlencoded())
module.exports = router
router.use(express.urlencoded())
// 注册用户
router.post("/register",(req,res)=>{
    console.log("收到的参数是",req.body);
    const{username,password}=req.body   //解构穿过来的数据
    // 根据注册业务的要求,验证名字是否占用
    // 根据用户名去做一次查询，如果找到了结果，说明名字被占用，如果查询结果为空，说明名字可以使用
    // 使用sql命名
    const sqlStrSelect=`select username from users where username="${username}"`
    // 连接数据库
    conn.query(sqlStrSelect,(err,result)=>{
        // 说明查询出错
        if(err){
            console.log(err);
            res.json({status:500,msg:"服务器错误"})
            return
        }
        console.log(result);
        //说明名字被占用了
        if(result.length>0){
            res.json({status:1,msg:"注册失败,名字被占用了"})
            return
        }
        // 说明没有占用,继续做添加
        // 拼接sql，添加到数据表中
        const sqlStr=`insert into users (username,password)values("${username}","${password}")`
        // 继续执行sql操作数据库
        conn.query(sqlStr,(err,result)=>{
            console.log(err);
            console.log(result);
            if(err){
                res.json({status:500,msg:"服务器错误"})
                return
            }
            // 根据操作结果，做不同的响应
            res.json({status:0,msg:"注册成功"})
        })
    })

})
// 登录账号
router.post("/login",(req,res)=>{
    console.log("收到的参数是",req.body);
    const {username,password}=req.body
    // 拼接sql字符串
    const sqlStrSelect=`select username password from users where username="${username}" and password=${password}`
    // 连接数据库进行验证
    conn.query(sqlStrSelect,(err,result)=>{
            if(err){
                console.log(err);
                res.json({status:500,msg:"服务器错误"})
                return
            }
            console.log(result);
            if(result.length>0){
                //查找到了说明登录成功
                const token=jwt.sign(
                    // 配置toekn
                    {name:username},
                    'az66',
                    {expiresIn:2*60*60} //过期时间,单位是秒
                )
                res.json({msg:"登录成功",status:0,token,ll:"cs"})
            }else{
                res.json({msg:"登录失败,用户名密码不对",status:1})
            }
    })
})