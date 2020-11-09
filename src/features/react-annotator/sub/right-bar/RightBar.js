import React, {useState} from 'react';
import styles from './styles';
import {Button, Menu, MenuItem, Popover, Position, Tooltip} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import AnnotationRow from "./sub/AnnotationRow";
import Block from "./sub/Block";
import CreateDialog from "./sub/CreateDialog";
import ConceptTree from "../../../tree-example/ConceptTree";

function RightBar() {
    const c = styles();
    const {annotations} = useSelector(s => s.app);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const getAnnotations = () =>
        annotations.map((anno, i) => <AnnotationRow key={i} annotation={anno}/>);

    const getTagPlaceholder = () =>
        <p className={c.placeholder}>No tags yet!</p>;

    const addNewEntityBtn = (
        <Tooltip content='Create new concept' position={Position.BOTTOM}>
            <Button icon='plus' minimal onClick={openDialog}/>
        </Tooltip>
    );

    const menu = (
        <Menu>
            <MenuItem text='Import' icon='import'/>
            <MenuItem text='Export' icon='export'/>
        </Menu>
    );

    const menuBtn = (
        <Popover content={menu}>
            <Button icon='menu' minimal onClick={() => 0}/>
        </Popover>

    );

    function openDialog() {
        setIsDialogOpen(true);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }

    return (
        <div className={c.root}>
            <CreateDialog isOpen={isDialogOpen} onClose={closeDialog}/>

            <Block title='Annotations' actions={menuBtn}>
                {annotations.length > 0 ? getAnnotations() : getTagPlaceholder()}
            </Block>

            <Block title='Ontology' actions={addNewEntityBtn}>
                <ConceptTree/>
            </Block>
        </div>
    );
}

export default RightBar;