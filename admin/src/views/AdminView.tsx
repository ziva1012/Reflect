import React from "react";
import {UserDisplayControl} from "../components/UserDisplayControl";
import style from "./../styles/main.scss";
import {AddUserDisplay} from "../components/AddUserDisplay";

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
    }

    componentDidMount() {
        this.setState({});
    }

    handleAddUserDisplay(isAutomatic: boolean) {
        let displays = this.state.users;
        displays.push({
            id: (parseInt((displays[displays.length - 1] ?? 0).id) + 1) + "",
            isAutomatic: isAutomatic
        });
        this.setState({users: displays});
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
            </div>
        );
    }
}
