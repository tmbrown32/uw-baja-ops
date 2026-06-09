
const express=require('express');
const cors=require('cors');
const sqlite3=require('sqlite3').verbose();

const app=express();
app.use(cors());
app.use(express.json());

const db=new sqlite3.Database('data.db');
db.serialize(()=>{
  db.run('CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY, text TEXT, status TEXT)');
});

app.get('/tasks',(req,res)=>{
  db.all('SELECT * FROM tasks',(err,rows)=>res.json(rows));
});

app.post('/tasks',(req,res)=>{
  const {text,status}=req.body;
  db.run('INSERT INTO tasks(text,status) VALUES(?,?)',[text,status]);
  res.json({ok:true});
});

app.put('/tasks/:id',(req,res)=>{
  const {text,status}=req.body;
  db.run('UPDATE tasks SET text=?, status=? WHERE id=?',[text,status,req.params.id]);
  res.json({ok:true});
});

app.listen(3001,()=>console.log('Server running'));
