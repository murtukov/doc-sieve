import React from 'react';
import Tree, {mutateTree, moveItemOnTree} from '@atlaskit/tree';
import {useDispatch, useSelector} from "react-redux";
import Item from "./sub/Item";

const PADDING_PER_LEVEL = 16;

function ConceptTree() {
    const {conceptTree: tree} = useSelector(s => s.app)
    const dispatch = useDispatch();

    if (!tree) {
        return null;
    }

    function setTree(newTree) {
        dispatch.app.setConceptTree(newTree);
    }

    function onExpand(itemId) {
        setTree(mutateTree(tree, itemId, {isExpanded: true}));
    }

    function onCollapse(itemId) {
        setTree(mutateTree(tree, itemId, {isExpanded: false}));
    }

    function onDragEnd(source, destination){
        if (!destination) {
            return;
        }
        const newTree = moveItemOnTree(tree, source, destination);
        setTree(newTree);
    }

    return (
        <Tree
            tree={tree}
            renderItem={props => <Item {...props}/>}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onDragEnd={onDragEnd}
            offsetPerLevel={PADDING_PER_LEVEL}
            isDragEnabled
            isNestingEnabled
        />
    );
}

export default ConceptTree;