import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie"
import styles from "../styles/login.module.css"

const cookies = new Cookies();

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const configuration = {
            method: "post",
            url: "http://127.0.0.1:3001/login",
            data: {
                email,
                password,
            },
        };

        axios(configuration)
            .then((result) => {
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                console.log(result.data.token);
                dispatch({type: 'auth/login', payload: {email: email, token: result.data.token, id: result.data.id, name: result.data.name}});
                navigate('/index');
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={styles.form_container}>
            <div className={styles.form}>
                <h2>Вход</h2>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    {/* email */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </Form.Group>
                    {/* password */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                        />
                    </Form.Group>
                    {/* submit button */}
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Вход
                    </Button>
                </Form>
            </div>
        </div>
    );
}