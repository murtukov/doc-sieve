import {createUseStyles} from "react-jss";

export const minWidth = 300;

export default createUseStyles({
    root: {
        minWidth,
        height: 'calc(100vh - 50px)',
        backgroundColor: "#f3f3fb",
        position: "fixed",
        right: 0,
        padding: 10,
    }
});