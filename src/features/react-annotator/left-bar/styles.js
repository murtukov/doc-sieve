import {createUseStyles} from "react-jss";

export const width = 80;

export default createUseStyles({
    root: {
        // borderRight: '1px solid #dbdcdd',
        display: "flex",
        flexDirection: "column",
        width,
        position: "fixed",
        left: 0,
        padding: 15,
        height: '100%',
        backgroundColor: "#f3f3fb",
        '& button': {
            height: 50
        }
    },
    btn: {
        width: 50,
        height: 50
    }
});