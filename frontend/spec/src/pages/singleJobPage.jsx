import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SingleJobPage() {
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.auth)
    console.log({currUser})
    const { jobId } = useParams();
    console.log(jobId);
    const [job, setJob] = useState(
        useSelector((state) => {
            return state.jobs.find((job) => job.id == jobId);
        })
    );
    const [err, setErr] = useState(null);
    console.log("job", job);
    useEffect(() => {
        if (job == undefined) {
            const jobUrl = `http://127.0.0.1:3001/jobs/${jobId}`;
            console.log(jobUrl);
            const jobConfig = {
                method: "get",
                url: jobUrl,
            };
            axios(jobConfig)
                .then((jobFetchResult) => {
                    console.log(jobFetchResult);
                    setJob(jobFetchResult.data);
                    dispatch({
                        type: "jobs/addJob",
                        payload: jobFetchResult.data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    setErr(err);
                });
        }
    }, []);
    console.log(job);
    return (
        <>
            {err && <h1>Some error occured</h1>}
            {!err && (
                <>
                    <h1>{job?.name || "Название"}</h1>
                    <p>{job?.descr || "Описание"}</p>
                    <p>Цена: {job?.price || "Цена"}</p>
                    <p>
                        Позвонить:{" "}
                        <a href={"tel:" + job?.phone_number || "номер"}>
                            {job?.phone_number || "номер"}
                        </a>
                    </p>
                    <p>
                        Написать:{" "}
                        <a href={"tel:" + job?.email || "email"}>
                            {job?.email || "email"}
                        </a>
                    </p>
                    <Link to={"/users/" + job?._creator}>
                        Профиль специалиста
                    </Link>
                    {currUser?.id == job?._creator && (
                        <Link to={"/edit/"+job?._id}>Редактировать</Link>
                    )}
                </>
            )}
        </>
    );
}
