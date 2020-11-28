import React, {useEffect} from "react";
import style from "./../styles/mainView.scss";

export function MainView() {
    const [opacity, setOpacity] = React.useState<number>(0);

    useEffect(() => {

        setTimeout(() => {
            handleOpacityChange(Math.random());
        }, Math.floor(Math.random() * 3000) + 2000);

        // TODO: firebase
    });

    const handleOpacityChange = (newOpacity: number) => {
        console.log("Set opacity "  + newOpacity);
        setOpacity(newOpacity);
    }

    return (
        <div className={style.mainView}>
            <div className={style.representationHolder}>
                <div className={style.representationRed}></div>
                <div className={style.representationGreen} style={{opacity: opacity}}></div>
            </div>
        </div>
    );
}
