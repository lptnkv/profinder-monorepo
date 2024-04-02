import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import styles from "../styles/createJob.module.css"

const currentUserSelector = state => state.auth

export default function CreateJobPage({props}) {
    const [jobName, setJobName] = useState("")
    const [jobPrice, setPrice] = useState(0)
    const [jobDescr, setDescr] = useState("")
    const creator = useSelector(currentUserSelector)
    console.log(creator)

    const navigate = useNavigate();

    useEffect(()=>{
        if (creator == null) {
            navigate("/login")
        }
    }, [])
    // console.log(creator)
    function handleSubmit(event) {
        event.preventDefault();
        const configuration = {
            method: "post",
            url: "http://127.0.0.1:3001/jobs",
            data: {
                jobName,
                jobPrice,
                jobDescr,
                creatorId: creator.id
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
    return (
        <div className={styles.form_container}>
        <h1>
            Добавить услугу
        </h1>
        <form action="/addJob" method="POST" className={styles.form}>
            <input type="text" name="jobName" id="jobName" placeholder="Название" className={styles.jobNameInput} onChange={(e) => setJobName(e.target.value)}/>
            <textarea name="jobDescr" id="jobDescr" cols="30" rows="10" placeholder="Описание" onChange={(e) => setDescr(e.target.value)}></textarea>
            <input type="number" name="jobPrice" id="jobPrice" placeholder="Цена" onChange={(e) => setPrice(e.target.value)}/>
            <input type="submit" value="Создать" onClick={(e) => handleSubmit(e)}/>
        </form>
        </div>
    )
}