const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, 'db.json');

function readDB(){
  const raw = fs.readFileSync(DB_PATH,'utf8');
  return JSON.parse(raw);
}
function writeDB(data){
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

app.get('/api/tasks', (req, res) => {
  const db = readDB();
  res.json(db.tasks || []);
});

app.post('/api/tasks', (req, res) => {
  const db = readDB();
  const task = req.body;
  task.id = Date.now().toString();
  task.completed = !!task.completed;
  task.progress = task.progress || 0;
  db.tasks.push(task);
  writeDB(db);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const db = readDB();
  const idx = db.tasks.findIndex(t=>t.id===id);
  if(idx === -1) return res.status(404).json({error:'not found'});
  db.tasks[idx] = {...db.tasks[idx], ...req.body};
  writeDB(db);
  res.json(db.tasks[idx]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const db = readDB();
  const idx = db.tasks.findIndex(t=>t.id===id);
  if(idx === -1) return res.status(404).json({error:'not found'});
  const removed = db.tasks.splice(idx,1)[0];
  writeDB(db);
  res.json(removed);
});

const PORT = process.env.PORT || 5000;

// Start the server and attach a basic error handler so EADDRINUSE is handled with a clear message
const server = app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the process using it or set a different PORT environment variable.`);
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});
