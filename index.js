console.log('Estamos arriba');
console.log(process.platform);
const express = require('express');
const app = express();
const path = require('path');
const { readFile}= require('fs');
const { response } = require('express');
app.use(express.static(__dirname))
app.get('/', (request, response)=> {
readFile('./index.html','utf8',(err,HtmlF)=>{
  if (err){ 
    response.status(500).response('error');
  }
  response.send(HtmlF);
});});

app.use(express.static(__dirname),(req,res)=>{
res.type('text/plain')
res.status(404);
res.send('404 not found')
});
app.get('/ay.html', (request, response)=> {
readFile('./ay.html','utf8',(err,HtmlF)=>{
  if (err){ 
    response.status(500).response('error');
  }
  response.send(HtmlF);
});});
app.listen(process.env.PORT||3000, ()=> console.log('on http://localhost:'+3000));