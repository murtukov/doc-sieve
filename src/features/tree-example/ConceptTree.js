import React, {useState} from 'react';
import styled from 'styled-components';
import Tree, {mutateTree, moveItemOnTree} from '@atlaskit/tree';
import {Button} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";

const PADDING_PER_LEVEL = 16;

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

function ConceptTree() {
    const {conceptTree: tree} = useSelector(s => s.app)
    const dispatch = useDispatch();

    if (!tree) {
        return null;
    }

    function setTree(newTree) {
        dispatch.app.setConceptTree(newTree);
    }

    function renderItem({item, onExpand, onCollapse, provided}) {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <span>{getIcon(item, onExpand, onCollapse)}</span>
                <span>{item.data?.name || ''}</span>
            </div>
        );
    }

    function getIcon(item, onExpand, onCollapse) {
        if (item.children.length > 0) {
            return item.isExpanded ?
                <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon>
                :
                <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
                ;
        }

        return <PreTextIcon>&bull;</PreTextIcon>;
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

    function addNew() {
        const newTree = {
            rootId: tree.rootId,
            items: {
                ...tree.items,
                '1-3': {
                    id: '1-3',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        title: 'Child 1-3',
                    },
                },
            },
        };

        setTree(mutateTree(newTree, '1', { children: ['1-1', '1-2', '1-3'] }));
    }

    return <>
        <Tree
            tree={tree}
            renderItem={renderItem}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onDragEnd={onDragEnd}
            offsetPerLevel={PADDING_PER_LEVEL}
            isDragEnabled
        />
        <Button text='Add' onClick={addNew}/>
    </>;
}

export default ConceptTree;