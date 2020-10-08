import React, {useState} from 'react';
import styled from 'styled-components';
import Tree, {mutateTree, moveItemOnTree} from '@atlaskit/tree';
import treeWithTwoBranches from './sampleData';

const PADDING_PER_LEVEL = 16;

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

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

function PureTree() {
    const [tree, setTree] = useState(treeWithTwoBranches);

    function renderItem({item, onExpand, onCollapse, provided}) {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <span>{getIcon(item, onExpand, onCollapse)}</span>
                <span>{item.data ? item.data.title : ''}</span>
            </div>
        );
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
            renderItem={renderItem}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onDragEnd={onDragEnd}
            offsetPerLevel={PADDING_PER_LEVEL}
            isDragEnabled
        />
    );
}

export default PureTree;