
export default function Kanban({tasks,move}){
const cols=['Backlog','In Progress','Review','Done'];
return(<div style={{display:'flex',gap:20}}>
{cols.map(c=>(<div key={c}><h3>{c}</h3>{tasks.filter(t=>t.status===c).map(t=>(
<div key={t.id} style={{background:'#facc15',color:'black',margin:5,padding:10}}>
{t.text}
<div>{cols.map(col=><button key={col} onClick={()=>move(t,col)}>{col}</button>)}</div>
</div>
))}</div>))}
</div>);
}
