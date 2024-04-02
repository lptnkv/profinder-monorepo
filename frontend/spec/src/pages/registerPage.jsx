import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from "axios";
import styles from "../styles/register.module.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://127.0.0.1:3001/register",
            data: {
                email,
                password,
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
            <div className={styles.form}>
                <h2>Регистрация</h2>
                <Form onSubmit={(e) => handleSubmit(e)}>
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
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Подтвердите пароль"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Регистрация
                    </Button>
                </Form>
            </div>
        </div>
    )
}