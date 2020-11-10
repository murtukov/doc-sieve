import React, {useState} from 'react';
import Block from "../Block";
import {Button, Colors, Menu, MenuItem, Popover} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import AnnotationRow from "./AnnotationRow";
import {createUseStyles} from "react-jss";
import ExportDialog from "./ExportDialog";

function Annotations(props) {
    const c = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {annotations} = useSelector(s => s.app);

    const closeDialog = () => setIsDialogOpen(false);
    const openDialog  = () => setIsDialogOpen(true);

    const getAnnotations = () => {
        return annotations.map((anno, i) =>
            <AnnotationRow key={i} annotation={anno}/>
        );
    };

    const getTagPlaceholder = () => {
        return <p className={c.placeholder}>No tags yet!</p>;
    };

    const menu = (
        <Menu>
            <MenuItem
                text='Import annotations'
                icon='import'
            />
            <MenuItem
                text='Export annotations'
                icon='export'
                disabled={annotations.length === 0}
                onClick={openDialog}
            />
        </Menu>
    );

    const menuBtn = (
        <Popover content={menu}>
            <Button icon='menu' minimal onClick={() => 0}/>
        </Popover>

    );

    return <>
        <ExportDialog isOpen={isDialogOpen} onClose={closeDialog}/>
        <Block title='Annotations' actions={menuBtn}>
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