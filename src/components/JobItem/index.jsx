import { useState } from "react";

const JobItem = props => {
    const {job,updateJob,deleteJob}=props
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(job.title);

    useEffect(() => {
        setText(job.title);
      }, [job.title]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <li>
            {isEditing ? (
            <>
            <input value={text} 
            onChange={(event)=>{
                setText(event.target.value)
            }}/>
            <button onClick={()=>{
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