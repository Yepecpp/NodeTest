//#region Consts 
const express = require('express');
const app = express();
const path = require('path');
const Port = process.env.PORT || 8080;
const mysql = require('mysql2');
const { json } = require('express/lib/response');
//#endregion
// mysql conection
const conection = mysql.createConnection({
  user:'gregory',
  password:'elso',
  host:'localhost',
  database:'test'
});
// test conection
conection.connect((err)=>{ 
  if (err) {
  console.log('error en la conexion');
  return;
}
  console.log('conectado');
}); 
//Routes
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});
//app use templates
app.use(express.static(path.join(__dirname, '/Templates')));
app.get('/', (req, res)=> {
  console.log('Peticion en /root '+req.ip);
  res.sendFile(path.join(__dirname + '/Templates/Index.html'));
});
app.get('/users/:id', (req, res)=> {
  console.log('peticion get en /users');
  var query = req.params.id==0? 'SELECT * FROM users':`SELECT * FROM users WHERE id = ${req.params.id}`;
  console.log(req.params.id); console.log(query);
  conection.query(query,(err,rows)=>{
    if (err) console.log(err);
    res.send(rows);
  });
}
); 
app.use(express.json());
app.put('/users/:ID',(req,res)=>{
  console.log('peticion put en /users');
  const {Email, Passw,UType} = req.body;
  var query = `UPDATE users SET Email = '${Email}', Passw = '${Passw}', UType = '${UType}' WHERE Id = ${req.params.ID}`;
  console.log(query);
  conection.query(query,(err,rows)=>{
    if (err) console.log(err);
    res.send({
    ID: req.params.ID
    });
  });
}
);
app.post('/users', (req, res)=> {
  console.log('peticion post en /users');
  const {Email, Passw,UType} = req.body;
  var query = `INSERT INTO users (Id, Email, Passw, UType) VALUES (null, '${Email}', '${Passw}', '${UType}')`
  console.log(query);
  conection.query(query,(err,rows)=>{
    if (err) console.log(err,query);
    res.send({
      Id: rows.insertId,
      Email: Email,
      Passw: Passw,
      UType: UType
    });
  });
}
); 
//default 404 page
app.use( (req, res) => {
  console.log('Peticion en 404');
  res.status(404).send('404 not found')}  // 404 not found  when the page request doesnt exist
);