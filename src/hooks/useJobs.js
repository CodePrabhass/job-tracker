import { useState,useEffect,useCallback,useMemo } from "react";
import {v4 as uuidv4} from 'uuid';
import {STATUSES} from "../constants"

const useJobs = () =>{
    const STORAGE_KEY = "jobs";
    // State for the list of jobs, initialized from localStorage
    const [jobsList,setJobsList] = useState(()=>{
      const storedJobs = localStorage.getItem(STORAGE_KEY);
      if(!storedJobs)
        return [];
      return JSON.parse(storedJobs).map(job=>({
        ...job,
        status:job.status || STATUSES[0]
      }))
    });
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [searchText, setSearchText] = useState("");
  
    // Effect to persist jobs to localStorage whenever jobsList changes
    useEffect(()=>{
      localStorage.setItem(STORAGE_KEY,JSON.stringify(jobsList));
    },[jobsList]);
  
    // Function to add a new job to the list
const addJob = useCallback((title,company) => {
    if(title.trim() !== ""){
      const newJob={
                    uniqueId:uuidv4(),
                    title,
                    company,
                    status:STATUSES[0],
                    appliedDate: new Date().toISOString(),
                    notes: "",
                    source: "",
                    priority: "Medium"
                    };
        setJobsList(prev=>[newJob,...prev]);
      }  
    },[])
    // Function to delete a job by its uniqueId
    const deleteJob = useCallback((uniqueId) => {
      setJobsList(prev=>prev.filter(job=>job.uniqueId !== uniqueId));
    },[]);
   
    // Function to update an existing job's title
    const updateJob = useCallback((id,newJob) => {
      setJobsList(prev=>prev.map(eachJob=>
      eachJob.uniqueId === id
       ? {...eachJob,title:newJob}
       :eachJob
      )
      );
    },[]);
  
    // Function to update an existing job's status
    const updateJobStatus = useCallback((id,newStatus) => {
      setJobsList(prev=>prev.map(eachJob=>
      eachJob.uniqueId === id
       ? {...eachJob,status:newStatus}
       :eachJob
      )
      );
    },[])
  
    const visibleJobs=useMemo(()=>{
      return jobsList.filter(job => {
            const matchesStatus =
              filterStatus === "ALL" || job.status === filterStatus
          
            const matchesSearch =
              job.title.toLowerCase().includes(searchText.toLowerCase())
          
            return matchesStatus && matchesSearch
         })
      },[jobsList,filterStatus,searchText]);
  
    const clearJobs =useCallback(()=>{
      setJobsList([]);
    },[])

    return {
        jobsList,
        visibleJobs,
        addJob,
        updateJob,
        deleteJob,
        updateJobStatus,
        filterStatus,
        setFilterStatus,
        searchText,
        setSearchText,
        clearJobs
    }
}
export default useJobs;