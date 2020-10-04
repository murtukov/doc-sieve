import React, {useState} from 'react';
import styles from './styles';
// import {Button, Position, Radio, RadioGroup, Tooltip} from "@blueprintjs/core";
import {useSelector} from "react-redux";
// import EntityRow from "./sub/EntityRow";
import TagRow from "./sub/TagRow";
import Block from "./sub/Block";
// import CreateDialog from "./sub/CreateDialog";

function RightBar() {
    const c = styles();
    const {tags} = useSelector(s => s.app);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const [selectedTag, setSelectedTag] = useState();

    const getTags = () => tags.map((tag, i) => <TagRow key={i} data={tag}/>);

    const getTagPlaceholder = () => <p className={c.placeholder}>No tags yet!</p>;
    // const getEntities = () => entities.map((e, i) => <EntityRow key={i} data={e}/>);
    // const getEntityPlaceholder = () => <p className={c.placeholder}>No entities yet!</p>;
    //
    // const addNewEntityBtn = (
    //     <Tooltip content='Create new entity' position={Position.BOTTOM}>
    //         <Button icon='plus' minimal onClick={openDialog}/>
    //     </Tooltip>
    // );

    // function openDialog() {
    //     setIsDialogOpen(true);
    // }
    //
    // function closeDialog() {
    //     setIsDialogOpen(false);
    // }

    return (
        <div className={c.root}>
            {/*<CreateDialog isOpen={isDialogOpen} onClose={closeDialog}/>*/}

            <Block title='Tags'>
                {tags.length > 0 ? getTags() : getTagPlaceholder()}
            </Block>

            {/*<Block title='Types' actions={addNewEntityBtn}>*/}
            {/*    {entities.length > 0 ? getEntities() : getEntityPlaceholder()}*/}
            {/*</Block>*/}
        </div>
    );
}

export default RightBar;