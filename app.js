const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const http = require('http');
const fs = require('fs');
const https = require('https');
const history = require('connect-history-api-fallback');
const compression = require('compression')
const options = {
    key: fs.readFileSync("./Nginx/2_www.ggbeng.xyz.key"),
    cert: fs.readFileSync("./Nginx/1_www.ggbeng.xyz_bundle.crt")
}

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);
var io = require('socket.io')(httpsServer);

io.on('connection', function(socket) {
    console.log('新用户登录');

    
    socket.on("disconnect", function() {
        console.log("a user go out");
    });

    socket.on("messages", function(obj) {
        //返回信息给客户端
        // console.log(obj);
        if (obj.type == 'emoji') {
            socket.emit("messages", obj.data);
            return;
        }
        if (obj.type == 'load') {
            socket.emit("messages", obj.data);
            return;
        }
        if (obj.type == 'file') {
            let dataBuffer = new Buffer.from(obj.data.file, 'base64');
            //写入文件
            fs.writeFile('static/txt/' + new Date().getTime() + '.zip', dataBuffer, function(err) {
                if (err) {
                    console.log(err);
                    let msg = { text: '保存失败，请重新上传' }
                    socket.emit("messages", msg);
                } else {
                    console.log('保存成功');
                    let msg = { text: '谢谢，已经收到了' }
                    socket.emit("messages", msg);
                }
            });

            return;
        }
        if (obj.type == 'text') {
            console.log(obj.data)
            let msg = { text: '谢谢，已经收到了' }
            socket.emit("messages", msg);
        }
    });
});
app.use(compression());
app.use(history());
app.use(cookieParser());
app.use(express.static('static'))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});
const url = 'mongodb://localhost:27017'
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     // console.log('数据库已创建');
//     var dbase = db.db("user");
//     dbase.createCollection('ggbeng', function (err, res) {
//         if (err) throw err;
//         // console.log("创建集合!");
//         db.close();
//     });
// });
app.get("/", function(req, res) {

    res.sendFile("/static/index.html")

})
app.post("/hid/login", jsonParser, (req, res) => {
    let name = req.body.username;
    let val = req.body.password;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err1, db) {
        if (err1) throw err1;
        let dbo = db.db("user");
        let whereStr = { "username": name };
        let ggbeng = dbo.collection("ggbeng") // 查询条件
        let success = {
            state: true
        }
        let failed = {
            state: false,
            message: '用户名或密码错误,请重新输入'
        }
        let empty = {
            state: false,
            message: '用户名不存在，请注册'
        }
        ggbeng.find(whereStr).toArray(function(err2, result) {
            if (err2) throw err2;
            if (result.length > 0 && result[0].password == val) {
                success.id = result[0]._id
                success.message = '欢迎' + result[0].nackname + '的到来'
                success.nackname = result[0].nackname
                res.send(success)
                db.close();
            } else if (result.length > 0 && result[0].password != val) {
                res.send(failed)
                db.close();
            } else if (result.length == 0) {
                res.send(empty)
                db.close();
            }
        });
    });
})
app.post("/hid/repassword", jsonParser, (req, res) => {
    let name = req.body.username;
    let val = req.body.oldpassword;
    let newpass = req.body.password;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err1, db) {
        if (err1) throw err1;
        let dbo = db.db("user");
        let whereStr = { "username": name };
        let ggbeng = dbo.collection("ggbeng") // 查询条件
        let success = {
            state: true
        }
        let failed = {
            state: false,
            message: '用户名或密码错误,请重新输入'
        }
        let empty = {
            state: false,
            message: '用户名不存在，请注册'
        }
        let updata = { $set: { "password": newpass } }
        ggbeng.find(whereStr).toArray(function(err2, result) {
            if (err2) throw err2;
            if (result.length > 0 && result[0].password == val) {
                ggbeng.update(whereStr, updata, function(err, data) {
                    if (err) {
                        console.log("err" + err)
                    } else {
                        res.send(success)
                    }
                })
                db.close();
            } else if (result.length > 0 && result[0].password != val) {
                res.send(failed)
                db.close();
            } else if (result.length == 0) {
                res.send(empty)
                db.close();
            }
        });
    });
})
app.post("/hid/clearCookie", jsonParser, (req, res) => {
    res.clearCookie("user");
    res.send({
        state: true
    })

})
app.get("/hid/cc", jsonParser, (req, res) => {
    res.send({
        state: true
    })

})
app.post("/hid/regist", jsonParser, (req, res) => {
    let name = req.body.username
    let nackname = req.body.nackname
    let myobj = {
        username: name,
        password: req.body.password,
        nackname: nackname
    }
    MongoClient.connect(url, { useNewUrlParser: true }, function(err1, db) {
        if (err1) throw err1;
        let dbo = db.db("user");
        let whereStr = { "username": name };
        let ggbeng = dbo.collection("ggbeng") // 查询条件
        let success = {
            state: true,
            message: '注册成功，快去登录吧'
        }
        let failed = {
            state: false,
            message: '用户名重复,请重新输入'
        }
        ggbeng.find(whereStr).toArray(function(err2, result) {
            if (err2) throw err2;
            if (result.length == 0) {
                ggbeng.insert(myobj, function(err3, done) {
                    if (err3) throw err3;
                    console.log("插入success");
                    res.send(success)
                    db.close();
                });
            } else {
                console.log(result)
                res.send(failed)
                db.close();
            }
            db.close();
        });
    });
})
app.post("/hid/resive", jsonParser, (req, res) => {
    let data = req.body;
    console.log(data.text)
    res.send({
        state: true,
        message: 接受成功
    })
})


// app.listen(3000, () => console.log('Example app listening on port 3000!'))
httpsServer.listen(443);
httpServer.listen(80);