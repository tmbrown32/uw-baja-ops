
import {useState,useEffect} from 'react';
import Kanban from './components/Kanban';

export default function App(){
const[tasks,setTasks]=useState([]);
const[input,setInput]=useState('');

const load=()=>fetch('http://localhost:3001/tasks').then(r=>r.json()).then(setTasks);
useEffect(load,[]);

const add=()=>{
fetch('http://localhost:3001/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:input,status:'Backlog'})}).then(load);
setInput('');
};

const move=(task,newStatus)=>{
fetch('http://localhost:3001/tasks/'+task.id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...task,status:newStatus})}).then(load);
}

return(<div style={{background:'black',color:'#facc15',minHeight:'100vh',padding:20}}>
<h1>Ultimate Engineering Ops System</h1>
<input value={input} onChange={e=>setInput(e.target.value)} />
<button onClick={add}>Add Task</button>
<Kanban tasks={tasks} move={move}/>
</div>);
}
