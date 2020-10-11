import React, {useState} from 'react';
import styles from './styles';
import {Button, Position, Tooltip} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import TagRow from "./sub/TagRow";
import Block from "./sub/Block";
import CreateDialog from "./sub/CreateDialog";
import ConceptTree from "../../../tree-example/ConceptTree";

function RightBar() {
    const c = styles();
    const {annotations} = useSelector(s => s.app);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const [selectedTag, setSelectedTag] = useState();

    const getTags = () => annotations.map((tag, i) => <TagRow key={i} data={tag}/>);

    const getTagPlaceholder = () => <p className={c.placeholder}>No tags yet!</p>;

    const addNewEntityBtn = (
        <Tooltip content='Create new concept' position={Position.BOTTOM}>
            <Button icon='plus' minimal onClick={openDialog}/>
        </Tooltip>
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

            <Block title='Annotations'>
                {annotations.length > 0 ? getTags() : getTagPlaceholder()}
            </Block>

            <Block title='Ontology' actions={addNewEntityBtn}>
                {/*{ontology.length > 0 ? getConcepts() : getConceptPlaceholder()}*/}
                <ConceptTree/>
            </Block>
        </div>
    );
}

export default RightBar;