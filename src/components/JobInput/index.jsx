const JobInput = props => {
    const {job,setJob,addJob} = props
    const onChangeInput = (event) => {
        setJob(event.target.value)
    }
    return(
        <>
        <input type="search"
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
        <button onClick={addJob}>Add job</button>
        </>
    )
}
export default JobInput;