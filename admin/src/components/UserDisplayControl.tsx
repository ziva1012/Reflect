import React from "react";
import {ControlSlider} from "./ControlSlider";
import style from "./../styles/userDisplayControl.scss";
import {Button} from "@material-ui/core";

interface props {
    id: string;
    startValue: number;
    isAutomatic: boolean;
}

export function UserDisplayControl (props: props) {

    const handleChange = (newValue: number) => {
        console.log(`ID: ${props.id} newValue: ${newValue}`);
        // TODO: implement firebase
    }

    const handlePulse = () => {
        console.log("PULSE");
        // TODO: implement firebase
    }

    return (
        <div className={style.userDisplay}>
            <p>ID: {props.id}</p>
            {
                !props.isAutomatic && (
                    <ControlSlider defaultValue={props.startValue} onChange={handleChange} />
                )
            }
            <Button onClick={handlePulse}>Pulse</Button>
        </div>
    );
}
