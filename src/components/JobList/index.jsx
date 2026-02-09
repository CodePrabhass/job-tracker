
import JobItem from "../JobItem";

const JobList = props =>{
    const {
        jobsList,
        updateJob,
        deleteJob
    } = props

    return(
        <ul>
            {jobsList.map((eachJob)=>(
                <JobItem
                key={eachJob.uniqueId}
                job={eachJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
                />
            ))}
        </ul>
    )
}
export default JobList;