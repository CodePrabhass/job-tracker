import { useState } from "react";
import './App.css'
import {v4 as uuidv4} from 'uuid';

/**
 * A React component that creates a job tracker application
 * Allows users to add and display job titles
 */
function App() {

  const [job,setJob] = useState(""); 
  const [jobsList,setJobsList] = useState([]);

  const addJob = () => {
    if(job.trim() !== ""){
      const newJob={uniqueId:uuidv4(),title:job}
      setJobsList([...jobsList,newJob]);
      setJob("")
    }  
  }
  const deleteJob = (uniqueId) => {
    const updatedJobs = jobsList.filter((job)=>job.uniqueId!==uniqueId);
    setJobsList(updatedJobs);
  }
  return (
    <div className="App">
      <h1>JOB TRACKER App</h1>
      <input type="text" 
      placeholder="Enter job title"
      value={job}
      onChange={(event)=>setJob(event.target.value)}
      />
      <button onClick={addJob}>
        Add job
      </button>
      
      <ul>
        {jobsList.map((each)=>(
         <li key={each.uniqueId}>
            {each.title} 
          <button onClick={()=>deleteJob(each.uniqueId)}>DELETE</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;