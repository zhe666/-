const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt =require('jsonwebtoken')
const { route } = require('./user_router.js')
router.use(express.urlencoded())



module.exports = router

// 获取文章分类列表
router.get("/cates",(req,res)=>{
    const sqlStrSelect=`select * from categories`
    conn.query(sqlStrSelect,(err,result)=>{
        if(err){
            console.log(err);
            res.json({status:500,msg:"服务器错误"})
            return
        }
        res.json({
            status:0,msg:"获取文章分类列表成功",
            data:result
        })
    })
})
//新增文章分类
router.post("/addcates`",(req,res)=>{
    const {name,slug}=res.body
    const sqlStrSelect = `insert into categories (name,slug) values ('${name}','${slug}')`
    conn.query(sqlStrSelect,(err,result)=>{
        if(err){
            console.log(err);
            res.json({status: 500, msg: "服务器错误"})
            return
        }
        res.json({
            status: 0, msg: "新增文章分类成功"
          })
      
    })
})
//根据id删除文章分类
router.get("/deletecate",(req,res)=>{
    const {id}=res.query
    const sqlStrSelect=`delete from categories where id=${id}`
    conn.query(sqlStrSelect,(err,result)=>{
        if(err){
            res.json({status:500,msg:"服务器错误"})
            return
        }
        res.json({
            status:0,msg:"删除文章分类成功"
        })
    })
})
// 根据 Id 获取文章分类数据
router.get("/getCatesById",(req,res)=>{
    const {id}=res.query
  const sqlStrSelect = `select * from categories where id=${id}`
  conn.query(sqlStrSelect,(err,result)=>{
      if(err){
          res.json({status:500,msg:"服务器错误"})
          return
      }
      res.json({
        status:0,msg:"获取文章分类成功",
        data:result[0]
      })
  })

})
//根据 Id 更新文章分类数据
router.post("/updatecate",(req,res)=>{
    const {id,name,slug}=res.body
    const sqlStrSelect = `update categories set name="${name}",slug="${slug}" where id=${id}`
    conn.query(sqlStrSelect,(err,result)=>{
        if(err){
            res.json({status:500,msg:"服务器错误"})
            return
        }
        res.json({
            status:0,msg:"更新文章分类成功",
          })
    })
})