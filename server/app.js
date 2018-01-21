const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user_model');
const Schema = mongoose.Schema ;


const app = express();

app.use(bodyParser.json()); // for parsing application/json

const personSchema = Schema({
    _id     : Number,
    name    : String,
    age     : Number,
    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
const storySchema = Schema({
    _creator : { type: Number, ref: 'Person' },
    title    : String,
    fans     : [{ type: Number, ref: 'Person' }]
});
const Story  = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);



mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

db.on('error', function(error){
    console.log('数据库test_nodeVue连接失败：' + error)
    return
});

db.once('open', function(){
    console.log('数据库test_nodeVue连接成功');
    // 初始化数据库
    const aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });
   /* aaron.save(function (err) {
        if (err) return handleError(err);

        const story1 = new Story({
            title: "Once upon a timex.",
            _creator: aaron._id    // assign the _id from the person
        })
        story1.save(function (err) {
            if (err) return handleError(err);
            // thats it!
        });
        console.log('————————————story');

  /!*  let kittySchema = mongoose.Schema({
        name: String,
        age:Number
    });
    let biaoming = mongoose.model('nihao', kittySchema);

    let silence = new biaoming({ name: 'buhao',age:1111});

    silence.save(function (err, fluffy) {
        if (err) return console.error(err);
    });*!/

});*/
    Story
        .findOne({ title: 'Once upon a timex.' })
        .populate('_creator')
        .exec(function (err, story) {
            if (err) return handleError(err);
            console.log('The creator is %s', story._creator.name);
            console.log('story'+story);
            // prints "The creator is Aaron"
        })



});
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/api/admin/user', function (req, res) {
    console.log(req.query);
    let name = req.query.name;
    let age = req.query.age;
    console.log(name,age);
    // let kittySchema = mongoose.Schema({
    //     name: String,
    //     age:Number
    // });
    //表名字！
    // let biaoming = mongoose.model('LIUWEI', kittySchema);

    let silence = new User({ name: name,age:age});
    // res.json({code:200,msg:'ok'})

    silence.save(function (err, tank) {
        if (err) return console.error(err);
        console.log('这是什么');
        console.log(tank)
    });
    User.findOne({"name":"zahoyan"},function (err,results) {
        if(err) return handleError(err);
        console.log('这是查询返回的内容'+results);
        res.json({code:'200',msg:'okokokookok',data:results});
    })
});



const server = app.listen(7788,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('zhangyachao app listening at http://%s:%s',host,port);
});
