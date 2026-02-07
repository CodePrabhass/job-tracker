import { useState,useEffect } from "react";
import './App.css'
import {v4 as uuidv4} from 'uuid';

/**
 * A React component that creates a job tracker application
 * Allows users to add and display job titles
 */
const App=()=>{

  const [job,setJob] = useState(""); 
  const [jobsList,setJobsList] = useState(()=>{
    const storedJobs = localStorage.getItem("jobs")
    return storedJobs?(JSON.parse(storedJobs)):[]
  });
  const [editingId,setEditingId] = useState(null);
  const [editingText,setEditingText] =useState("")

  useEffect(()=>{
    localStorage.setItem("jobs",JSON.stringify(jobsList))
  },[jobsList])

  const addJob = () => {
    if(job.trim() !== ""){
      const newJob={uniqueId:uuidv4(),title:job}
      setJobsList([...jobsList,newJob]);
      setJob("")
    }  
  }
  const deleteJob = (uniqueId) => {
    const filteredJobsList = jobsList.filter((eachJob)=>eachJob.uniqueId!==uniqueId);
    setJobsList(filteredJobsList);
  }

  const updateJob = (id) => {
    const updatedJob = jobsList.map((eachJob)=>
    eachJob.uniqueId === id
     ? {...eachJob,title:editingText}
     :eachJob
    )
    setJobsList(updatedJob)
    setEditingId(null)
    setEditingText("")
  }

  const startEdit = (eachJob) => {
    setEditingId(eachJob.uniqueId)
    setEditingText(eachJob.title)
  }
  return (
    <div className="App">
      <h1>JOB TRACKER App</h1>

      <input
        type="text"
        placeholder="Enter job title"
        value={job}
        onChange={(event) => setJob(event.target.value)}
      />

      <button onClick={addJob} className="button">Add job</button>

      <ul>
      {jobsList.map((eachJob)=>(
        <li key={eachJob.uniqueId}>
          {editingId === eachJob.uniqueId ? (
          <>
          <input value={editingText}
          onChange = {(event)=>setEditingText(event.target.value)}
          />
          <button onClick={()=>updateJob(eachJob.uniqueId)} className="button">SAVE</button>
          </>
          ):(
          <>
          {eachJob.title}
          <button onClick = {()=>startEdit(eachJob)} className="button">EDIT</button>
          <button onClick={() => deleteJob(eachJob.uniqueId)} className="button">Delete</button>
          </>
          )}
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
