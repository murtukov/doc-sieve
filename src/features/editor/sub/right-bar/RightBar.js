import React, {useState} from 'react';
import styles from './styles';
import {Button, Position, Tooltip} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import EntityRow from "./sub/EntityRow";
import TagRow from "./sub/TagRow";
import Block from "./sub/Block";
import CreateDialog from "./sub/CreateDialog";

function RightBar() {
    const c = styles();
    const {entities, tags} = useSelector(s => s.app);
    const [isDialogOpen, updateDialogOpen] = useState(false);

    const getTags = () => tags.map((tag, i) => <TagRow key={i} data={tag}/>);
    const getEntities = () => entities.map((e, i) => <EntityRow key={i} data={e}/>);
    const getTagPlaceholder = () => <p className={c.placeholder}>No tags yet!</p>;
    const getEntityPlaceholder = () => <p className={c.placeholder}>No entities yet!</p>;

    const addNewEntityBtn = (
        <Tooltip content='Create new entity' position={Position.BOTTOM}>
            <Button icon='plus' minimal onClick={openDialog}/>
        </Tooltip>
    );

    function openDialog() {
        updateDialogOpen(true);
    }

    function closeDialog() {
        updateDialogOpen(false);
    }

    return (
        <div className={c.root}>
            <CreateDialog isOpen={isDialogOpen} onClose={closeDialog}/>

            <Block title='Entities' actions={addNewEntityBtn}>
                {entities.length > 0 ? getEntities() : getEntityPlaceholder()}
            </Block>

            <Block title='Tags'>
                {tags.length > 0 ? getTags() : getTagPlaceholder()}
            </Block>
        </div>
    );
}

export default RightBar;