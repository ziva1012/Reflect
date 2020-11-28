import style from "../styles/userDisplayControl.scss";
import React from "react";
import {
    Button,
    Checkbox, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel, IconButton,
} from "@material-ui/core";
// @ts-ignore
import AddIcon from "@material-ui/icons/Add";

interface props {
    onAdd: (isAutomatic: boolean) => any;
}

export function AddUserDisplay (props: props) {

    const [open, setOpen] = React.useState<boolean>(false);
    const [isAutomatic, setIsAutomatic] = React.useState<boolean>(false);

    const handleAdd = () => {
        setOpen(false);
        props.onAdd(isAutomatic);
    }

    return (
        <div className={style.userDisplay}>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add user display</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        control={<Checkbox checked={isAutomatic} onChange={(event => setIsAutomatic(event.target.checked))} />}
                        label="Automatic"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <IconButton onClick={() => setOpen(true)} color={"secondary"}>
                <AddIcon />
            </IconButton >
        </div>
    );
}
