import JobsList from "../components/JobsList";
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import axios from "axios";

export default function JobsPage() {
    const [jobs, setJobs] = useState(useSelector(state => state.jobs))
    const dispatch = useDispatch();
    useEffect(() => {
        const jobsUrl = `http://127.0.0.1:3001/jobs`
        const jobsConfig = {
            method: "get",
            url: jobsUrl,
        };
        axios(jobsConfig).then((jobsFetchResult) => {
            console.log("jobsFetchResult: ", jobsFetchResult);
            setJobs(jobsFetchResult.data);
            dispatch({type: 'jobs/setJobs', payload: jobsFetchResult.data})
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <>
            <h1>Список доступных предложений</h1>
            <JobsList jobs={jobs} />
        </>
    )
}
