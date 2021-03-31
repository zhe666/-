const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt = require('jsonwebtoken')
router.use(express.urlencoded())

module.exports = router
const multer = require("multer")  //文件上传配置
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    // 保存时
    // 文件名叫什么
    filename: function (req, file, cb) {
        const filenameArr = file.originalname.split(".");

        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName)
    }
})
const upload = multer({ storage })

// 获取用户基本信息
router.get("/userinfo", (req, res) => {
    const { username } = req.body
    console.log(username);
    // 拼接字符串
    const sqlStrSelect = `select * from users where uesername="${username}"`
    conn.query(sqlStrSelect, (err, result) => {
        //说明查询错误
        if (err) {
            console.log(err);
            res.json({ status: 500, msg: "服务器错误" })
            return
        }
        res.json({
            status: 0, msg: "获取用户基本信息成功",
            data: result[0]

        })
    })
})
// 更新用户
router.post("/userinfo", (req, res) => {
    const { id, nickname, email, userPic } = req.body;
    const sqlStrSelect = `update users set nickname="${nickname}",email="${email}",userPic="${userPic}"where id="${id}"`
    console.log(sqlStrSelect)
    if (err) {
        console.log(err);
        res.json({

            status: 500, msg: "服务器错误"
        })
        return


    }
    res.json({
        status: 0, msg: "修改用户信息成功"
    })
})
// 重置密码
router.post("/updatepwd", (req, res) => {
    const { oldPwd, newPwd, id } = req.body;
    const sqlStrSelect = `select password from users where id=${id}`
    conn.query(sqlStrSelect, (err, result) => {
        // 说明查询错误
        if (err) {
            console.log(err);
            res.json({
                status: 500, msg: "服务器错误"
            })
            return
        }
        if (result[0].password !== oldPwd) {
            console.log(err);
            res.json({
                status: 1, msg: "旧密码错误"
            })
            return
        }
        const sqlStrSelect1 = `updata users set password="${newPwd}" where id="${id}"`
        conn.query(sqlStrSelect1, (err, result) => {
            //说明查询出错
            if (err) {
                console.log(err);
                res.json({ status: 500, msg: "服务器错误" })
              
            }
            res.json({
                status: 0, msg: "更新密码成功"
            })
        })
    })
})
    //上传用户头像
    router.post("/uploadPic", upload.single("file_data"), (req, res) => {
        // 如果文件上传成功
        console.log("本次上传的文件是", req.file);
        res.json({
            "code": 200,
            "msg": "上传成功",
            "src": "http://127.0.0.1:3000/uploads/" + req.file.filename
        })
    })
