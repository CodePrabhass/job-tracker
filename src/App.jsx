import { useState } from "react";
import './App.css'

/**
 * A React component that creates a job tracker application
 * Allows users to add and display job titles
 */
function App() {
  // State for the current job input
  const [job,setJob] = useState("");
  // State for the list of jobs
  const [jobs,setJobsList] = useState([]);
  return (
    <div className="App">
      <h1>JOB TRACKER App</h1>
      <input type="text" 
      placeholder="Enter job title"
      value={job}
      onChange={(event)=>setJob(event.target.value)}
      />
      <button onClick={()=>{
        if(job.trim() !== ""){
        setJobsList([...jobs,job]);
        setJob("")
      }}
    }
      >
        Add job
      </button>
      <ul>
        {jobs.map((item,index)=>(
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;