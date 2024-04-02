import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/editJob.module.css";

const currentUserSelector = (state) => state.auth;

export default function EditJobPage() {
    const [jobName, setJobName] = useState("");
    const [jobPrice, setPrice] = useState(0);
    const [jobDescr, setDescr] = useState("");
    const [err, setErr] = useState(null);
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.auth);
    const creator = useSelector(currentUserSelector);
    console.log(creator);
    const { jobId } = useParams();
    const [job, setJob] = useState(
        useSelector((state) => {
            return state.jobs.find((job) => job.id === jobId);
        })
    );
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
                    setJob(jobFetchResult.data);
                    setJobName(job.name);
                    setDescr(job.descr);
                    setPrice(job.price);
                    console.log()
                })
                .catch((err) => {
                    console.log(err);
                    setErr(err);
                });
        }
    }, []);
    function handleSubmit(event) {
        event.preventDefault();
        const configuration = {
            method: "PATCH",
            url: "http://127.0.0.1:3001/jobs",
            data: {
                jobName,
                jobPrice,
                jobDescr,
                creatorId: creator.id,
            },
        };
        axios(configuration)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                error = new Error();
                console.log(error);
            });
    }
    console.log(job);
    return (
        <>
            <h1>Редактирование</h1>
            <form action="/jobs" method="PATCH" className={styles.form}>
                <input
                    type="text"
                    name="jobName"
                    id="jobName"
                    placeholder="Название"
                    value={jobName}
                    className={styles.jobNameInput}
                    onChange={(e) => setJobName(e.target.value)}
                />
                <textarea
                    name="jobDescr"
                    id="jobDescr"
                    cols="30"
                    rows="10"
                    value={jobDescr}
                    placeholder="Описание"
                    onChange={(e) => setDescr(e.target.value)}
                ></textarea>
                <input
                    type="number"
                    name="jobPrice"
                    id="jobPrice"
                    placeholder="Цена"
                    value={jobPrice}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="submit"
                    value="Изменить"
                    onClick={(e) => handleSubmit(e)}
                />
            </form>
        </>
    );
}
