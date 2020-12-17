import React from 'react';
import Block from "../Block";
import {Button, Colors, Menu, MenuItem, Popover} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import AnnotationRow from "./AnnotationRow";
import {createUseStyles} from "react-jss";

function Annotations() {
    const c = useStyles();
    const {annotations} = useSelector(s => s.app);

    const getAnnotations = () => {
        return annotations.map((anno, i) =>
            <AnnotationRow key={i} annotation={anno}/>
        );
    };

    const getTagPlaceholder = () => {
        return <p className={c.placeholder}>No tags yet!</p>;
    };

    // const menu = (
    //     <Menu>
    //         <MenuItem
    //             text='Import annotations'
    //             icon='import'
    //         />
    //         <MenuItem
    //             text='Export annotations'
    //             icon='export'
    //             disabled={annotations.length === 0}
    //         />
    //     </Menu>
    // );

    // const menuBtn = (
    //     <Popover content={menu}>
    //         <Button icon='menu' minimal onClick={() => 0}/>
    //     </Popover>
    //
    // );

    return <>
        <Block title='Annotations'>
            {annotations.length > 0 ? getAnnotations() : getTagPlaceholder()}
        </Block>
    </>;
}

const useStyles = createUseStyles({
    placeholder: {
        color: Colors.GRAY3,
        textAlign: "center"
    },
});

export default Annotations;