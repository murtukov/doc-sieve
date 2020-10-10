import React from 'react';
import styled from 'styled-components';
import Tree, {mutateTree, moveItemOnTree} from '@atlaskit/tree';
// import {Button} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {Button, Icon} from "@blueprintjs/core";
// import Navigation, {AkNavigationItem} from "@atlaskit/navigation";
// import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
// import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import useStyles from './styles';

const PADDING_PER_LEVEL = 16;

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

// const Dot = styled.span`
//   display: flex;
//   width: 24px;
//   height: 32px;
//   justify-content: center;
//   font-size: 12px;
//   line-height: 32px;
// `;

function ConceptTree() {
    const {conceptTree: tree} = useSelector(s => s.app)
    const dispatch = useDispatch();

    if (!tree) {
        return null;
    }

    function setTree(newTree) {
        dispatch.app.setConceptTree(newTree);
    }

    function renderItem(props) {
        return <Item {...props}/>
    }

    // function getIcon(item, onExpand, onCollapse) {
    //     if (item.children && item.children.length > 0) {
    //         return item.isExpanded ? (
    //             <Button
    //                 spacing="none"
    //                 appearance="subtle-link"
    //                 onClick={() => onCollapse(item.id)}
    //             >
    //                 <ChevronDownIcon
    //                     label=""
    //                     size="medium"
    //                     onClick={() => onCollapse(item.id)}
    //                 />
    //             </Button>
    //         ) : (
    //             <Button
    //                 spacing="none"
    //                 appearance="subtle-link"
    //                 onClick={() => onExpand(item.id)}
    //             >
    //                 <ChevronRightIcon
    //                     label=""
    //                     size="medium"
    //                     onClick={() => onExpand(item.id)}
    //                 />
    //             </Button>
    //         );
    //     }
    //     return <Dot>&bull;</Dot>;
    // }

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
            isNestingEnabled
        />
    );
}

function Item({item, onExpand, onCollapse, provided}) {
    const c = useStyles(item.data);
    return (
        <div
            className={c.item}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <span className={c.iconWrapper}>{getIcon(item, onExpand, onCollapse, c)}</span>
            <span className={c.name}>{item.data.name}</span>
        </div>
    );
}

function getIcon(item, onExpand, onCollapse, c) {
    if (item.children.length > 0) {
        return item.isExpanded ?
            <Button
                className={c.iconBtn}
                icon='minus'
                minimal
                small
                onClick={() => onCollapse(item.id)}
            />
            :
            <Button
                className={c.iconBtn}
                icon='plus'
                minimal
                small
                onClick={() => onExpand(item.id)}
            />
    }

    return <Icon className={c.dot} icon='dot' color='lightgrey'/>;
}

export default ConceptTree;