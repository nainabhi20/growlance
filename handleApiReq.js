const fs=require('fs')
const axios=require('axios')
const pug = require("pug");
module.exports = (req , res)=>{
let count = parseInt(fs.readFileSync('./count.txt'))
console.log(count)
if(count<=20){
    
    console.log('listening here...')
    axios.get('https://api.github.com/users').then((data)=>{
        res.send({'count':count,'data':data.data})
    }).catch((err)=>{
        console.log("There is an error..."+err)
    })
}
else if(count>20&&count<40){
    setTimeout(20000,()=>{
        res.setHeader('content-type', 'text/json');
        console.log('listening here...')
        axios.get('https://api.github.com/users').then((data)=>{
            res.send(data.data)
        }).catch((err)=>{
            console.log("There is an error..."+err)
        })
    })
}else{
    res.setHeader('content-type', 'text/html');
    console.log('listening here...')
    res.send('<h1>The server is busy try again later...</h1>')
}
count++;
fs.writeFileSync('./count.txt',''+count)
}