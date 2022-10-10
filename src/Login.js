import Home from "./Home";
import React, { useState } from "react";
import "./styles.css";

export default function Login() {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // User Login info
    const database = [
        {
            email: "example1@gmail.com",
            password: "1234"
        },
        {
            email: "example2@gmail.com",
            password: "64"
        }
    ];

    const errors = {
        email: "Invalid Email",
        password: "Invalid Password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        // we can directly use email and password state variables 
        var { email, password } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.email === email.value);

        // Compare user info
        if (userData) {
            if (userData.password !== password.value) {
                // Invalid password
                setErrorMessages({ name: "password", message: errors.password });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "email", message: errors.email });
        }
    };

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const onEmailChange = (event) => {
        setEmail(event.target.value);
        if (validateEmail(event.target.value)) {
            setErrorMessages({});
        } else {
            setErrorMessages({ name: "email", message: errors.email });
        }
    }

    const validPassword = (password) => {
        var regex = /\d/g;
        if (regex.test(password)) {
            const total = password.split("").reduce((total, num) => {
                return total + parseInt(num);
            }, 0);
            if (total === 10) {
                return true;
            }
        }
        return false;
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
        if (validPassword(event.target.value)) {
            setErrorMessages({});
        } else {
            setErrorMessages({ name: "password", message: errors.password });
        }
    }

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <h1> Sign In </h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="email" name="email" value={email} onChange={onEmailChange} required />
                </div>
                {renderErrorMessage("email")}
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" value={password} onChange={onPasswordChange} required />
                </div>
                {renderErrorMessage("password")}
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            {isSubmitted ? <Home /> : <>{renderForm}</>}
        </div>
    );
}
