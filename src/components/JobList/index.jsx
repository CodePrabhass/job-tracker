
import JobItem from "../JobItem";

const JobList = props =>{
    const {
        jobsList,
        updateJob,
        updateJobStatus,
        deleteJob
    } = props

    return(
        <ul>
            {jobsList.length === 0 && <p>No Jobs Found</p>}
            {jobsList.map((eachJob)=>(
                <JobItem
                key={eachJob.uniqueId}
                job={eachJob}
                updateJob={updateJob}
                updateJobStatus={updateJobStatus}
                deleteJob={deleteJob}
                />
            ))}
        </ul>
    )
}
export default JobList;