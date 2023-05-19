import React, {useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import {Input} from "./Input";

const emailReducer = (prevState, action) => {
    if (action.type === "USER_INPUT") return {value: action.value, isValid: action.value.includes("@")};
    else if (action.type === "INPUT_BLUR") return {value: prevState.value, isValid: prevState.value.includes("@")};
    return {value: '', isValid: false};
};

const passwordReducer = (prevState, action) => {
    if (action.type === "USER_INPUT") return {value: action.value, isValid: action.value.trim().length > 6};
    else if (action.type === "INPUT_BLUR") return {value: prevState.value, isValid: prevState.value.trim().length > 6};
    return {value: '', isValid: false};
}
const Login = (props) => {
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false});
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(emailState.isValid && passwordState.isValid);
        }, 100);

        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailState.isValid, passwordState.isValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({type: "USER_INPUT", value: event.target.value});
    };
    const validateEmailHandler = () => {
        dispatchEmail({type: "INPUT_BLUR"});
    };
    const passwordChangeHandler = (event) => {
        dispatchPassword({type: "USER_INPUT", value: event.target.value});
    };


    const validatePasswordHandler = () => {
        dispatchPassword({type: "INPUT_BLUR"});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (<Card className={classes.login}>
        <form onSubmit={submitHandler}>

            <Input
                id="email"
                type="email"
                name="Email"
                value={emailState.value}
                isValid={emailState.isValid}
                onChangeHandler={emailChangeHandler}
                onBlurHandler={validateEmailHandler}
            />

            <Input
                id="password"
                type="password"
                name="Password"
                value={passwordState.value}
                isValid={passwordState.isValid}
                onChangeHandler={passwordChangeHandler}
                onBlurHandler={validatePasswordHandler}
            />

            <div className={classes.actions}>
                <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                    Login
                </Button>
                <Button className={classes.btn} onClick={props.continueAsGuest}>Continue as Guest</Button>
            </div>
        </form>
    </Card>);
};

export default Login;
