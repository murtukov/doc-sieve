import React from 'react';
import styles from './styles';
import {Button, H4, Position, Tooltip} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import EntityRow from "./sub/EntityRow";
import TagRow from "./sub/TagRow";

function RightBar() {
    const c = styles();
    const {entities, tags} = useSelector(s => s.app);

    const renderEntities = () =>
        entities.map((e, i) => <EntityRow key={i} data={e}/>);

    const renderEntityPlaceholder = () =>
        <p className={c.placeholder}>No entities yet!</p>;

    const renderTags = () =>
        tags.map((tag, i) => <TagRow key={i} data={tag}/>);

    const renderTagPlaceholder = () =>
        <p className={c.placeholder}>No tags yet!</p>;


    return (
        <div className={c.root}>
            <div className={c.block}>
                <H4 className={c.title}>
                    Entities
                    <Tooltip content='Create new entity' position={Position.BOTTOM}>
                        <Button icon='plus' minimal/>
                    </Tooltip>
                </H4>
                {entities.length > 0 ? renderEntities() : renderEntityPlaceholder()}
            </div>

            <div className={c.block}>
                <H4 className={c.title}>
                    Tags
                    <Button icon='plus' minimal style={{visibility: "hidden"}}/>
                </H4>
                {tags.length > 0 ? renderTags() : renderTagPlaceholder()}
            </div>
        </div>
    );
}

export default RightBar;