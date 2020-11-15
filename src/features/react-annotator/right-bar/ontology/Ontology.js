import React, {useState} from 'react';
import ConceptTree from "../../../tree-example/ConceptTree";
import Block from "../Block";
import {Button, Position, Tooltip} from "@blueprintjs/core";
import CreateDialog from "./CreateDialog";

function Ontology() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    return <>
        <CreateDialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
        />
        <Block title='Ontology' actions={addNewEntityBtn}>
            <ConceptTree/>
        </Block>
    </>;
}

export default Ontology;