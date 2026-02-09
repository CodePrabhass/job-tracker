import { useState,useEffect } from "react";
import './App.css'
import {v4 as uuidv4} from 'uuid';
import JobInput from "./components/JobInput";
import JobList from "./components/JobList"

/*
 * A React component that creates a job tracker application
 * Allows users to add and display job titles
 */
/**
 * A React component for a job tracking application
 * Allows adding, editing, deleting, and persisting jobs to localStorage
 */
const App=()=>{

  // State for the new job input
  const [job,setJob] = useState(""); 
  // State for the list of jobs, initialized from localStorage
  const [jobsList,setJobsList] = useState(()=>{
    const storedJobs = localStorage.getItem("jobs");
    return storedJobs?(JSON.parse(storedJobs)):[]
  });
  // Effect to persist jobs to localStorage whenever jobsList changes
  useEffect(()=>{
    localStorage.setItem("jobs",JSON.stringify(jobsList));
  },[jobsList]);

  // Function to add a new job to the list
  const addJob = () => {
    if(job.trim() !== ""){
      const newJob={uniqueId:uuidv4(),title:job};
      setJobsList([...jobsList,newJob]);
      setJob("");
    }  
  }
  // Function to delete a job by its uniqueId
  const deleteJob = (uniqueId) => {
    const filteredJobsList = jobsList.filter((eachJob)=>eachJob.uniqueId!==uniqueId);
    setJobsList(filteredJobsList);
  }

  // Function to update an existing job's title
  const updateJob = (id,newJob) => {
    setJobsList(prev=>prev.map(eachJob=>
    eachJob.uniqueId === id
     ? {...eachJob,title:newJob}
     :eachJob
    )
    );
  }
  return (
    <div className="App">
      <h1>JOB TRACKER App</h1>

      <JobInput job={job} setJob={setJob} addJob={addJob} />

      <JobList
        jobsList={jobsList}
        updateJob={updateJob}
        deleteJob={deleteJob}
      />
    </div>
  );
}

export default App;
