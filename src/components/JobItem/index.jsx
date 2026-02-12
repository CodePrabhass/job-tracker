import { useState,useEffect,useRef} from "react";
import React from "react";
import { STATUSES } from "../constants";

const JobItem = React.memo((props) => {
    const {job,updateJob,deleteJob,updateJobStatus}=props
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(job.title);
    const inputRef = useRef(null);

        useEffect(() => {
            setText(job.title);
        }, [job.title]);

      useEffect(()=>{
        if(isEditing){
        inputRef.current.focus();
        }
      },[isEditing])

    return (
        <li>
            {isEditing ? (
            <>
            <input 
            ref={inputRef}
            value={text} 
            onChange={(event)=>
                setText(event.target.value)
            }
            onKeyDown={(event)=>{
                if(event.key==='Enter' && text.trim()!==""){
                    updateJob(job.uniqueId,text)
                    setIsEditing(false)
                }
                if(event.key==='Escape'){
                    setText(job.title)
                    setIsEditing(false)
                }
            }}
            />
            <button 
            disabled={text.trim()===""}
            onClick={()=>{
                updateJob(job.uniqueId,text)
                setIsEditing(false)
                }}
            >Save</button>
            </>
        ):(<>
            <span>{job.title}</span>
            <button onClick={()=>setIsEditing(true)}>Edit</button>
        </>
        )}
        <button onClick={()=>
            {
            const confirmDelete = window.confirm(`Are you sure you want to delete ${job.title}?`)
            if(confirmDelete){
                deleteJob(job.uniqueId)
             }
            }}>Delete</button>
        <select
            value={job.status}
            onChange={(event) => updateJobStatus(job.uniqueId, event.target.value)}
            >
                {STATUSES.map((status)=>(
                    <option key={status} value={status}>{status}</option>
                ))}
        </select>

        </li>
    )
    
})
export default JobItem;