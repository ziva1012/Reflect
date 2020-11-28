import React from "react";
import {UserDisplayControl} from "../components/UserDisplayControl";
import style from "./../styles/main.scss";
import {AddUserDisplay} from "../components/AddUserDisplay";
import firebase from "firebase";
import {Button} from "@material-ui/core";

interface User {
    id: string;
    isAutomatic: boolean;
}

interface state {
    users: User[];
}

export class AdminView extends React.Component<any, state> {
    constructor(props: any) {
        super(props);

        this.state = {
            users: []
        }

        this.handleAddUserDisplay = this.handleAddUserDisplay.bind(this);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }

    async componentDidMount() {
        const config = {
            apiKey: "AIzaSyDluP0Wp9nYFNse_SdUDDBX-QHGKfDWbh0",
            authDomain: "reflect-59598.firebaseapp.com",
            databaseURL: "https://reflect-59598.firebaseio.com/",
            projectId: "reflect-59598",
            storageBucket: "reflect-59598.appspot.com",
            messagingSenderId: "124301744749",
            appId: "1:124301744749:web:a09d2d95c7bfb7de813d64",
            measurementId: "G-BH2DWFHXES"
        };
        firebase.initializeApp(config);
        this.loadFirebaseUsers().catch(console.log);
        this.setState({});
    }

    async loadFirebaseUsers() {
        const database = firebase.database().ref().child("users");
        try {
            let users: User[] = [];
            await database.once("value", function(snapshot) {
                snapshot.forEach((child) => {
                    users.push({
                        id: child.key ?? "KEY_NOT_FOUND",
                        isAutomatic: child.val().isAutomatic
                    })
                    console.log(child.key+": "+child.val());
                });
            });
            this.setState({
                users: users
            })
        } catch (e) {
            alert(e);
        }
    }

    handleAddUserDisplay(isAutomatic: boolean) {
        const rootRef = firebase.database().ref();
        const storesRef = rootRef.child('users');
        const newStoreRef = storesRef.push();

        newStoreRef.set({
            isAutomatic: isAutomatic,
            value: 0.5,
            pulse: false
        }).then(() => {
            let displays = this.state.users;
            displays.push({
                id: newStoreRef.key ?? "ID_FAILED",
                isAutomatic: isAutomatic
            });
            this.setState({users: displays});
        }).catch(alert);
    }

    handleRemoveAll() {
        if (window.confirm("Sure?!")) {
            const ref = firebase.database().ref('users');
            ref.remove().then(() => {
                this.loadFirebaseUsers().catch(console.log);
            }).catch(alert)
        }
    }

    render() {
        return (
            <div className={style.main}>
                <h1 className={style.heading}>Reflect - Admin tool</h1>
                <div className={style.userList}>
                    {
                        this.state.users.map(val => {
                            return <UserDisplayControl id={val.id} startValue={50} isAutomatic={val.isAutomatic} key={`UserDisplay${val.id}`} />
                        })
                    }
                    <AddUserDisplay onAdd={this.handleAddUserDisplay} />
                </div>
                <Button onClick={this.handleRemoveAll} color={"secondary"}>Remove All</Button>
            </div>
        );
    }
}
