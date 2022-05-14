console.clear();
console.log('Estamos arriba');
console.log(process.platform);
/* contstantes */
const express = require('express');
const app = express();
const path = require('path');
const { readFile}= require('fs');
const { response } = require('express');
const mysql = require('mysql2');
const reload = require('livereload');
var livereload = reload.createServer();
livereload.watch(path.join(__dirname + "/templates"));
app.listen(process.env.PORT||1433, ()=> console.log('on http://localhost:'+1433));
app.get('/', (request, response)=> {
  console.log('Peticion en /root '+request.ip);
  readFile('Templates/Index.html','utf8',(err,HtmlF)=>{
  if (err){ 
    response.status(500).send('error en el servidor, intenta de nuevo');
    return;
  }
  response.type('text/html').send(HtmlF);})
});

// conect to mysql

app.get('/Users',(request,response)=>{
  console.log('peticion en /users');
  conection.query('SELECT * FROM users',(err,rows)=>{
    if (err) console.log(err);
    response.send(rows);
  });
});
//app use templates
app.use(express.static(__dirname+'/Templates'));
//default 404 page
app.use( (req, res) => {
  console.log('Peticion en 404');
  res.status(404).send('404 not found')}  // 404 not found  when the page request doesnt exist
);