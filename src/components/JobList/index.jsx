
import JobItem from "../JobItem";

const JobList = props =>{
    const {
        jobsList,
        editingId,
        editingText,
        setEditingText,
        startEdit,
        updateJob,
        deleteJob
    } = props

    return(
        <ul>
            {jobsList.map((eachJob)=>(
                <JobItem
                key={eachJob.uniqueId}
                job={eachJob}
                editingId = {editingId}
                editingText={editingText}
                setEditingText={setEditingText}
                startEdit={startEdit}
                updateJob={updateJob}
                deleteJob={deleteJob}
                />
            ))}
        </ul>
    )
}
export default JobList;