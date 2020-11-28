import React, {ChangeEvent} from "react";
import {Button, TextField} from "@material-ui/core";
import style from "./../styles/register.scss";
import { useHistory } from "react-router-dom";

export function RegisterView () {

    const [isEnabled, setIsEnabled] = React.useState<boolean>(false);
    const [id, setId] = React.useState<string>("");
    const history = useHistory();


    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setIsEnabled(event.target.value.length >= 10);
        setId(event.target.value);
    }

    const handleNext = () => {
        localStorage.setItem("id", id);
        history.push("/main");
    }

    return (
        <div className={style.registerContainer}>
            <h1>Welcome!</h1>
            <TextField id="standard-basic" label="Please enter your ID" onChange={handleChange} />
            <Button disabled={!isEnabled} onClick={handleNext}>Next</Button>
        </div>
    );
}
