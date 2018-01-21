let express = require('express');

let app = express();
let admin = express();

// app.use(express.static('public'));
app.use('/xunikongjian',express.static('public'));

admin.on('mount',function (parent) {
    console.log('admin Mounted');
    console.log(parent);
});
admin.get('/',function (req,res){
    res.send('admin homepage');
});
app.use('/admin',admin);

app.get('/',function (req,res) {
    res.send('hell nodejs');
    // console.log(app.locals.title)
});


let server = app.listen(3001,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});