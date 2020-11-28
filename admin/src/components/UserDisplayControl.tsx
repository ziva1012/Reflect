import React, {useEffect} from "react";
import {ControlSlider} from "./ControlSlider";
import style from "./../styles/userDisplayControl.scss";
import {Button} from "@material-ui/core";
import firebase from "firebase";

interface props {
    id: string;
    startValue: number;
    isAutomatic: boolean;
}

export function UserDisplayControl (props: props) {

    const handleChange = (newValue: number) => {
        console.log(`ID: ${props.id} newValue: ${newValue}`);
        firebase.database().ref("users").child(props.id).update({value: newValue / 100}).catch(alert);
    }

    const handlePulse = () => {
        console.log("PULSE");
        firebase.database().ref("users").child(props.id).update({pulse: true}).catch(alert);
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
