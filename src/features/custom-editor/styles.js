import {createUseStyles} from "react-jss";

export default createUseStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 80,
        position: "fixed",
        left: 0,
        padding: 15,
        height: '100%',
        backgroundColor: "#f3f3fb",
        '& button': {
            height: 50
        }
    }
});