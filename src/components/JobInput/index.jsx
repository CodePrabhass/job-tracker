const JobInput = props => {
    const {job,setJob,company,setCompany,addJob} = props
    const onChangeInput = (event) => {
        setJob(event.target.value)
    }
    return(
        <>
        <input type="text"
               placeholder="Enter the job titile"
               value={job}
               onChange={onChangeInput}
               onKeyDown={(event)=>{
                if(event.key==="Enter" && job.trim()!==" "){
                    console.log("Enter key is pressed")
                    addJob()
                }
               }}
        />
        <input type="text"
               placeholder="Enter the company name"
               value={company}
               onChange={(event)=>setCompany(event.target.value)}
               onKeyDown={(event)=>{
                if(event.key==="Enter" && job.trim()!==" "){
                    addJob()
                }
               }}
        />

        <button onClick={addJob} disabled={job.trim()===""}>Add job</button>
        </>
    )
}
export default JobInput;