const JobInput = props => {
    const {job,setJob,addJob} = props
    const onChangeInput = (event) => {
        setJob(event.target.value)
    }
    return(
        <>
        <input type="text"
               placeholder="Enter the job titile"
               value={job}
               onChange={onChangeInput}
        />
        <button onClick={addJob}>Add job</button>
        </>
    )
}
export default JobInput;