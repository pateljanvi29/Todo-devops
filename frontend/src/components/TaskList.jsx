import React from 'react'
import axios from 'axios'

export default function TaskList({tasks, onToggle, onRefresh, apiBase}){
  async function remove(t){
    await axios.delete(`${apiBase}/tasks/${t.id}`)
    onRefresh()
  }

  async function updateProgress(t,e){
    await axios.put(`${apiBase}/tasks/${t.id}`, {progress: Number(e.target.value)})
    onRefresh()
  }

  function fmtDate(d){
    if(!d) return '';
    try { return new Date(d).toLocaleDateString(); } catch { return d }
  }

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length===0 && <p style={{color:'#6b7280'}}>No tasks yet — add your first task!</p>}
      <ul className="tasks">
        {tasks.map(t=> (
          <li key={t.id} className={t.completed? 'completed':''}>
            <div className="task-head">
              <div>
                <strong>{t.title}</strong>
                <div className="meta">
                  <span className="badge">{t.category || 'General'}</span>
                  {t.deadline ? <span className="meta">Due {fmtDate(t.deadline)}</span> : null}
                </div>
              </div>
              <div className="controls">
                <button onClick={()=>onToggle(t)} className="done">{t.completed? 'Undo':'Done'}</button>
                <button onClick={()=>remove(t)} className="delete">Delete</button>
              </div>
            </div>
            {t.description && <p style={{marginTop:8,color:'#334155'}}>{t.description}</p>}

            <div className="progress-row">
              <div className="progress-bar" aria-hidden>
                <i style={{width: `${t.progress || 0}%`}}></i>
              </div>
              <div className="progress-label">{t.progress || 0}%</div>
            </div>

            <div style={{marginTop:8}}>
              <input style={{width:'100%'}} type="range" min="0" max="100" value={t.progress||0} onChange={(e)=>updateProgress(t,e)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
