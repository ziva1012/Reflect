import React, {useEffect} from "react";
import style from "./../styles/mainView.scss";
import firebase from "firebase";

export function MainView() {
    const [opacity, setOpacity] = React.useState<number>(0);
    const [playPulse, setPlayPulse] = React.useState<boolean>(false);

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id == null) return;
        const database = firebase.database().ref("users").child(id);
        database.get().then((snapshot) => {
            handleOpacityChange(snapshot.val().value);
            if (snapshot.val().isAutomatic) {
                const allRefs = firebase.database().ref().child("users");
                allRefs.on("value", (snapshot) => {
                    let cumulated = 0;
                    let amount = 0;
                    snapshot.forEach((child) => {
                        if (child.val().isAutomatic) return;
                        cumulated += child.val().value;
                        amount++;
                    });
                    handleOpacityChange(cumulated / amount);
                });
            }
        });
        database.on("value", (snapshot) => {
            if (opacity != snapshot.val().value)
                handleOpacityChange(snapshot.val().value);
            if (!playPulse && snapshot.val().pulse)
                handlePlayPulse();
        });

        return () => database.off("value");
    }, []);

    const handleOpacityChange = (newOpacity: number) => {
        console.log("Set opacity "  + newOpacity);
        setOpacity(newOpacity);
    }

    const handlePlayPulse = () => {
        const id = localStorage.getItem("id");
        if (id == null) return;
        const database = firebase.database().ref("users").child(id);
        database.update({pulse: false}).then(() => {
            setPlayPulse(true);
        });
    }

    return (
        <div className={style.mainView}>
            <div className={`${style.representationHolder} ${playPulse ? style.playPulse : ""}`} onAnimationEnd={() => setPlayPulse(false)}>
                <div className={style.representationRed}></div>
                <div className={style.representationGreen} style={{opacity: opacity}}></div>
            </div>
        </div>
    );
}
