import React from "react";
import {createMuiTheme, Slider, ThemeProvider} from "@material-ui/core";

interface props {
    defaultValue: number;
    onChange: (newValue: number) => any;
}

const muiTheme = createMuiTheme({
    overrides:{
        MuiSlider: {
            thumb:{
                color: "white",
            },
            track: {
                color: 'white'
            },
            rail: {
                color: 'white'
            }
        }
    }
});

export function ControlSlider (props: props) {

    const [value, setValue] = React.useState<number>(props.defaultValue);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        if (typeof newValue != "number") return;
        setValue(newValue);
    };

    const handleChangeCommit = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        if (typeof newValue != "number") return;
        props.onChange(newValue);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <Slider value={value} onChange={handleChange} onChangeCommitted={handleChangeCommit} />
        </ThemeProvider>
    );
}
