import React from 'react';
import Topbar from "../generic/Topbar";
import {createUseStyles} from "react-jss";

function MainLayout({children}) {
    const c = useStyles();

    return <>
        <Topbar/>
        <div className={c.content}>
            {children}
        </div>
    </>;
}


const topBarHeight = '50px';

const useStyles = createUseStyles({
    content: {
        height: `calc(100vh - ${topBarHeight})`,
        display: "flex",
        marginTop: topBarHeight
    }
});

export default MainLayout;
