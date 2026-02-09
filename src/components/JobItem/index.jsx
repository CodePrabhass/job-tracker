import { useState,useEffect,useRef} from "react";

const JobItem = props => {
    const {job,updateJob,deleteJob}=props
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
        <button onClick={()=>deleteJob(job.uniqueId)}>Delete</button>
        </li>
    )
}
export default JobItem;