import {createUseStyles} from "react-jss";

export const minWidth = 300;

export default createUseStyles({
    root: {
        minWidth,
        maxWidth: minWidth,
        height: 'calc(100vh - 50px)',
        backgroundColor: "#f3f3fb",
        position: "fixed",
        right: 0,
        display: "flex",
        flexDirection: "column"
    },
    block: {
        flexGrow: 1
    },
    title: {
        padding: '5px 10px',
        backgroundColor: '#e0e0e4',
        justifyContent: "space-between",
        display: "flex",
        alignItems: 'center',
        height: 40
    }
});