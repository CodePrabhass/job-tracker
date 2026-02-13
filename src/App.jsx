import { useState,useEffect,useCallback,useMemo } from "react";
import './App.css'
import {v4 as uuidv4} from 'uuid';
import JobInput from "./components/JobInput";
import JobList from "./components/JobList";
import Stats from "./components/Stats";
import {STATUSES} from "./constants"

/*
 * A React component that creates a job tracker application
 * Allows users to add and display job titles
 */
/**
 * A React component for a job tracking application
 * Allows adding, editing, deleting, and persisting jobs to localStorage
 */


const App=()=>{
  console.log("App Rendered");
  // State for the new job input
  const [job,setJob] = useState(""); 
  // State for the list of jobs, initialized from localStorage
  const [jobsList,setJobsList] = useState(()=>{
    const storedJobs = localStorage.getItem("jobs");
    if(!storedJobs)
      return [];
    return JSON.parse(storedJobs).map(job=>({
      ...job,
      status:job.status || "Applied"
    }))
  });
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  // Effect to persist jobs to localStorage whenever jobsList changes
  useEffect(()=>{
    localStorage.setItem("jobs",JSON.stringify(jobsList));
  },[jobsList]);

  // Function to add a new job to the list
  const addJob = () => {
    if(job.trim() !== ""){
      const newJob={uniqueId:uuidv4(),title:job,status:STATUSES[0]};
      setJobsList(prev=>[newJob,...prev]);
      setJob("");
    }  
  }
  // Function to delete a job by its uniqueId
  const deleteJob = useCallback((uniqueId) => {
    console.log("deleteJob function reference stable");
    const filteredJobsList = jobsList.filter((eachJob)=>eachJob.uniqueId!==uniqueId);
    setJobsList(filteredJobsList);
  },[])
 
  // Function to update an existing job's title
  const updateJob = useCallback((id,newJob) => {
    console.log("updateJob function reference stable");
    setJobsList(prev=>prev.map(eachJob=>
    eachJob.uniqueId === id
     ? {...eachJob,title:newJob}
     :eachJob
    )
    );
  },[]);

  // Function to update an existing job's status
  const updateJobStatus = useCallback((id,newStatus) => {
    console.log("updateJobStatus function reference stable");
    setJobsList(prev=>prev.map(eachJob=>
    eachJob.uniqueId === id
     ? {...eachJob,status:newStatus}
     :eachJob
    )
    );
  },[])

  const visibleJobs=useMemo(()=>{
    console.log("filtering jobs...");
    return jobsList.filter(job => {
          const matchesStatus =
            filterStatus === "ALL" || job.status === filterStatus
        
          const matchesSearch =
            job.title.toLowerCase().includes(searchText.toLowerCase())
        
          return matchesStatus && matchesSearch
       })
    },[jobsList,filterStatus,searchText]);

  const clearButton =()=>{
    setJobsList([]);
  }

  return (
    <div className="App">
      <h1>JOB TRACKER App</h1>
      <div style={{ margin: "10px"}}>
        <button className="allButton" onClick={() => setFilterStatus("ALL")}>All</button>
        <button className="appliedButton" onClick={() => setFilterStatus("Applied")}>Applied</button>
        <button className="interviewButton" onClick={() => setFilterStatus("Interviewing")}>Interviewing</button>
        <button className="rejectButton" onClick={() => setFilterStatus("Rejected")}>Rejected</button>
      </div>
      <div>
        <input type="search"
          value={searchText} 
          onChange={(event)=>setSearchText(event.target.value)} 
          placeholder="Search jobs" />
      </div>
      <JobInput job={job} setJob={setJob} addJob={addJob} />
      <hr />
      <Stats jobList={jobsList}/>
      <button className="clearButton" onClick={()=>{
        const confirmClear = window.confirm("Are you sure you want to clear all jobs?");
        if(confirmClear){
          {clearButton}
        }
      }} disabled={jobsList.length===0}>Clear All</button>

      <JobList
        jobsList={visibleJobs}
        updateJob={updateJob}
        updateJobStatus={updateJobStatus}
        deleteJob={deleteJob}
      />
    </div>
  );
}

export default App;
