const express=require('express')
const fs=require('fs')
//const pug = require("pug");
const path = require("path");
const app=express()
const handle=require('./handleApiReq.js')
const port=process.env.PORT||3000

//app.set("view engine", "pug");
 
// Setting our default views
//app.set("views", __dirname + "/views");

//app.use(express.static(
 //   path.join(__dirname + "/public")));


app.get('/',(req,res)=>{
    res.setHeader('content-type', 'text/html');
    fs.readFile('./homepage.html','utf-8',(err,data)=>{
        console.log(data)
        res.send(data)
    })

})
let interval=setInterval(()=>{
    fs.writeFileSync('./count.txt',''+0)
},60000)

app.get('/api',(req,res)=>{
    console.log('Request for api...')
    res.setHeader('content-type','text/html')
    let count=fs.readFileSync('./count.txt')
    let result=`<!DOCTYPE html>
                 <html>
                 <head>
                 <title>Api request</title>
                 <style>
                      body{
                          background-color:black;
                      }
                      .heads{
                          color:white;
                      }
                      .ancle{
                          color:white;
                          background-color:green;
                          padding:5px;
                          border-radius:4px;
                          text-decoration:none;
                          font-size:1.3rem;
                        }
                      .but{
                          margin:1rem;
                          padding:8px;
                          cursor:pointer;
                          background-color:white;
                          transition:1s all;
                      }
                      .but:hover{
                          background-color:lightgrey;
                      }
                 </style>
                 </head>
                 <body>
                 <script>
                      let f1=()=>{
                          location.reload()
                      }
                 </script>
                       <h1 class='heads'>Count of all the api calls from all clients is ${count}</h1>
                       <a class='ancle' href='/api/getData'>Call the api</a><br/>
                       <button class='but' onClick='f1()'>Refresh</buttton>
                 </body>
                 </html>`
    res.send(result)
})


app.get('/api/getData',(req,res)=>{
    handle(req,res)

})

app.listen(port,(msg)=>{
    console.log("listening to port number 3000")
})

