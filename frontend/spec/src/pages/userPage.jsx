import { useEffect, useState } from "react"
import axios from "axios";
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import JobsList from "../components/JobsList";

export default function UserPage(props) {
    const [user, setUser] = useState({name: "загрузка"})
    const {userId} = useParams();
    const [jobs, setJobs] = useState(useSelector(state => state.jobs.filter(job => job.creator_id == userId)))
    useEffect(() => {
        const userUrl = `http://127.0.0.1:3001/user/${userId}`
        const userConfig = {
            method: "get", 
            url: userUrl
        }
        axios(userConfig).then((userFetchResult) => {
            console.log("user fetch result: ", userFetchResult);
            setUser(userFetchResult.data)
        })

        const jobsUrl = `http://127.0.0.1:3001/user/${userId}/jobs`
        const jobsConfig = {
            method: "get",
            url: jobsUrl,
        };
        axios(jobsConfig).then((jobsFetchResult) => {
            console.log("jobsFetchResult: ",jobsFetchResult);
            setJobs(jobsFetchResult.data);
        })
    }, [])
    return (<>
        <h1>Профиль пользователя {user.name}</h1>
            {jobs?.length != 0 && (
                <>
                <p>Список услуг</p>
                <JobsList jobs={jobs}/>
                </>
            )
            }  
            {jobs?.length == 0 && (
                <>
                <p>Пользователь еще не предоставил услуги</p>
                </>
            )
            }  
        
    </>)
}