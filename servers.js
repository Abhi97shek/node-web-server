const express=require('express');
const fs=require('fs');
const hbs=require('hbs');
var app=express();
const port=process.env.PORT || 3000;


hbs.registerPartials(__dirname +"/views/partials");
app.set('view engine','hbs');
app.use(express.static(__dirname + "/public"));


app.use((req,res,next)=>{
var date =new Date().toString();
var log=`${date}  ${req.method} ${req.url} ${req.hostname} ${req.ip}`;
fs.appendFileSync('Server.log',log+"\n");
next();
});


app.use((req,res,next)=>{

      res.render('maintaince.hbs');
});
app.get('/',(req,res)=>
{
  res.render('home.hbs',{
    pageTitle:"Home Page",
    CurrentYear:new Date().getFullYear()
  });

});
app.get('/about',(req,res)=>{

      res.render('about.hbs',{
          pageTitle:"About Page",
          CurrentYear: new Date().getFullYear()

      });
});

app.get('/bad',(req,res)=>{

      res.send({
        errormessage:"Ubale to connect to the Page",
      });

});

app.listen(port,()=>
{
  console.log(`Server is Up on Port ${port}`);
});
