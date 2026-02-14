import useJobs from "./hooks/useJobs"
import JobInput from "./components/JobInput";
import JobList from "./components/JobList";
import Stats from "./components/Stats";
import { useState } from "react";
import './App.css'

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
  const {
    jobsList,
    visibleJobs,
    updateJob,
    updateJobStatus,
    addJob,
    deleteJob,
    filterStatus,
    setFilterStatus,
    searchText,
    setSearchText,
    clearJobs
  } = useJobs()
  // State for the new job input
  const [job,setJob] = useState(""); 
  const [company,setCompany] = useState("");

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
      <JobInput 
        job={job} 
        setJob={setJob}
        company={company}
        setCompany={setCompany}
        addJob={()=>{
          addJob(job,company);
          setJob("");
          setCompany("")
      }} />
      <hr />
      <Stats jobList={jobsList}/>
      <button className="clearButton" onClick={()=>{
        const confirmClear = window.confirm("Are you sure you want to clear all jobs?");
        if(confirmClear){
          {clearJobs}
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
