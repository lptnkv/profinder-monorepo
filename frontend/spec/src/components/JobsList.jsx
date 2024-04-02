import JobItem from "./JobItem"

export default function JobsList({jobs}) {
    console.log(jobs)
    const renderedJobItems = jobs.map(job => {
        return <JobItem key={job.id} job={job}/>
    })

    return <ul className="jobs-list">{renderedJobItems}</ul>
}