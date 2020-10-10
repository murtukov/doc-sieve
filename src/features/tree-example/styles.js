import {createUseStyles} from "react-jss";

export default createUseStyles({
    item: {
        display: "flex",
        alignItems: "center",
        margin: [2, 10, 2, 3]
    },
    name: ({textColor, bgColor}) => ({
        color: textColor,
        backgroundColor: bgColor,
        padding: 5,
        borderRadius: 3,
        flexGrow: 1,
        fontSize: 16
    }),
    dot: {
        width: 24,
        height: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 3
    },
    iconWrapper: {
        // marginRight: 3
    },
    iconBtn: {
        '&:focus': {
            outline: 'unset'
        }
    }
});