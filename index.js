
console.clear();
console.log('Estamos arriba');
console.log(process.platform);
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
console.log(process.env.HOST);
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
/* contstantes */
const express = require('express');
const app = express();
const { readFile}= require('fs');
const { response } = require('express');
const mysql = require('mysql2');
const reload = require('reload');
reload(app);
// root de la pagina
app.listen(process.env.PORT||1433, ()=> console.log('on localhost:'+1433));
app.get('/', (request, response)=> {
  console.log('Peticion en /root '+request.ip);
  readFile('Templates/Index.html','utf8',(err,HtmlF)=>{
  if (err){ 
    response.status(500).send('error en el servidor, intenta de nuevo');
    return;
  }
  response.type('text/html').send(HtmlF);
});});
// conect to mysql pls
const conection = mysql.createConnection({
  user:'gregory',
  password:'elso',
  host:'localhost',
  database:'test'
});
conection.connect((err)=>{  if (err) {
console.log('error en la conexion');
return;
}
console.log('conectado');
}); 
// select * from users
app.get('/users',(request,response)=>{
  console.log('peticion en /users');
  conection.query('SELECT * FROM users',(err,rows)=>{
    if (err) console.log(err);
    response.send(rows);
  });
});
app.use(express.static(__dirname+'/Templates'));
app.use( (req, res) => {
  console.log('Peticion en 404');
  res.status(404).send('404 not found')}  // 404 not found  when the page request doesnt exist
);