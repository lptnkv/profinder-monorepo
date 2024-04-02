import {Link} from "react-router-dom"

export default function JobItem({job}) {
    const jobPageUrl = "/jobs/" + job._id;
    return <>
        <Link to={jobPageUrl}><h1>{job.name}</h1></Link>
        <p>{job.descr}</p>
    </>;
}
