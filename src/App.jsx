import { useState } from "react";
import './App.css'
import {v4 as uuidv4} from 'uuid';

/**
 * A React component that creates a job tracker application
 * Allows users to add and display job titles
 */
const initialJobList = [
  {
    id:uuidv4(),
    title:"Software Developer",
  },
  {
    uniqueId:uuidv4(),
    title:"Software Developer5",
  },
  {
    uniqueId:uuidv4(),
    title:"Software Developer4",
  },
  {
    uniqueId:uuidv4(),
    title:"Software Developer3",
  },

]
const App=()=>{

  const [job,setJob] = useState(""); 
  const [jobsList,setJobsList] = useState(initialJobList);
  const [editingId,setEditingId] = useState(null);
  const [editingText,setEditingText] =useState("")

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

    // Start editing
    const startEdit = (job) => {
      setEditingId(job.uniqueId);
      setEditingText(job.title);
    };
  
    // Save updated job
    const updateJob = (id) => {
      const updatedJobs = jobsList.map((job) =>
        job.uniqueId === id
          ? { ...job, title: editingText }
          : job
      );
  
      setJobsList(updatedJobs);
      setEditingId(null);
      setEditingText("");
    };
  

  return (
    <div className="App">
      <h1>JOB TRACKER App</h1>

      <input
        type="text"
        placeholder="Enter job title"
        value={job}
        onChange={(event) => setJob(event.target.value)}
      />

      <button onClick={addJob}>Add job</button>

      <ul>
        {jobsList.map((each) => (
          <li key={each.uniqueId}>
            {editingId === each.uniqueId ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) =>
                    setEditingText(e.target.value)
                  }
                />
                <button
                  onClick={() => updateJob(each.uniqueId)}
                >
                  SAVE
                </button>
              </>
            ) : (
              <>
                {each.title}
                <button onClick={() => startEdit(each)}>
                  EDIT
                </button>
                <button
                  onClick={() => deleteJob(each.uniqueId)}
                >
                  DELETE
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
