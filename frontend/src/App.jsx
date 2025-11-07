import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TaskList from './components/TaskList'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

// Use Vite's env object in the browser (import.meta.env). Avoid referencing `process` which is
// not defined by Vite and causes runtime errors in the browser.
const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export default function App(){
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({title:'',description:'',category:'General',deadline:'',progress:0})

  useEffect(()=>{ fetchTasks() },[])

  function fetchTasks(){
    axios.get(`${API}/tasks`).then(r=>setTasks(r.data)).catch(console.error)
  }

  function addTask(e){
    e.preventDefault();
    axios.post(`${API}/tasks`, form).then(()=>{ setForm({title:'',description:'',category:'General',deadline:'',progress:0}); fetchTasks() })
  }

  function toggleComplete(task){
    axios.put(`${API}/tasks/${task.id}`, {completed: !task.completed}).then(()=>fetchTasks())
  }

  const completed = tasks.filter(t=>t.completed).length
  const remaining = tasks.length - completed

  const data = {
    labels: ['Completed','Remaining'],
    datasets: [{data:[completed, remaining], backgroundColor:['#4caf50','#f44336']}]
  }

  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="logo">TT</div>
          <div>
            <h1 style={{margin:0}}>Task Tracker</h1>
            <div className="subtitle">Add, organize, and track progress — simple and fast</div>
          </div>
        </div>
        <div className="subtitle">You have <strong>{tasks.length}</strong> tasks — <span style={{color:'#16a34a'}}>{completed} done</span></div>
      </div>

      <div className="grid">
        <div>
          <div className="card task-form">
            <form onSubmit={addTask}>
              <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
              <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
              <input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} />
              <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
              <label style={{display:'block',marginBottom:6}}>Progress: {form.progress}%</label>
              <input type="range" min="0" max="100" value={form.progress} onChange={e=>setForm({...form,progress: Number(e.target.value)})} />
              <button type="submit" style={{marginTop:8}}>Add Task</button>
            </form>
          </div>
        </div>

        <div>
          <div className="card">
            <TaskList tasks={tasks} onToggle={toggleComplete} onRefresh={fetchTasks} apiBase={API} />
          </div>
        </div>

        <div>
          <div className="card">
            <h3>Progress</h3>
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
