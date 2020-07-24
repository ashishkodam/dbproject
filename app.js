
//https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/
//https://shop.startbootstrap.com/product/sb-ui-kit-pro/

//https://shop.startbootstrap.com/product/sb-ui-kit-pro-angular/
const express =  require('express');
const bodyParser =  require('body-parser');
const http =  require('http');
const mySQL = require('mysql');

const fs =  require('fs')
const file = require('express-fileupload');

const app =  express();

const restApi =  require('./router/RestApi')
const connect  =  mySQL.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database: "phanifinalproject"
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 
app.use(file());

app.use(express.static(__dirname + '/public/html'));
app.use('/css/style.css', express.static(__dirname + '/public/css/style.css'));
app.use('/js/main.js', express.static(__dirname + '/public/js/main.js'));




app.use('/api',restApi);

connect.connect((err) => {
    if (err) return err;
    console.log("Connected!");
    connect.query("CREATE DATABASE phaniFinalProject",(err, res) =>{
        if (err) return err;
        console.log("Database Created")
    });
    // connect.query("USE phaniFinalProject",(err, res) =>{
    //     if (err) return err;
    // });
    // console.log( 'start');
    // connect.query("SELECT * FROM players",(err,res) =>{
    //     if (err) console.log( err);
    //    // console.log("Data", res)
    // });
    // console.log( 'end');
});

app.post('/upload',(req, res, next) =>{
    if(req.files){
        fs.readFile(req.files.file.data,(err, data) =>{
            if (err) throw err;
                console.log(data);
        })
        //console.log(req.files.file.data);
    }

})





app.listen(5000);