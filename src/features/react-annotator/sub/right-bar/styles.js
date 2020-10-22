import {createUseStyles} from "react-jss";
import {Colors} from "@blueprintjs/core";

export const minWidth = 300;

export default createUseStyles({
    root: {
        minWidth,
        height: 'calc(100vh - 50px)',
        backgroundColor: "#f3f3fb",
        position: "fixed",
        right: 0,
        display: "flex",
        flexDirection: "column"
    },
    placeholder: {
        color: Colors.GRAY3,
        textAlign: "center"
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