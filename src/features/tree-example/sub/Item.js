import useStyles from "../styles";
import React from "react";
import {Button, Icon} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";

function Item({item, onExpand, onCollapse, provided}) {
    const {selectedConcept} = useSelector(s => s.app)
    const dispatch = useDispatch();
    const c = useStyles({...item.data, isSelected: selectedConcept?.name === item.data.name});

    function handleClick() {
        dispatch.app.setSelectedConcept(item.data);
    }

    function removeConcept() {
        if(!window.confirm('Remove the concept?')) {
            return;
        }
        dispatch.app.removeConcept(item.data.name);
    }

    return (
        <div
            className={c.item}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleClick}
        >
            <span className={c.iconWrapper}>{getIcon(item, onExpand, onCollapse, c)}</span>
            <span className={c.name}>{item.data.name}</span>
            <Button icon='trash' onClick={removeConcept} minimal/>
        </div>
    );
}

function getIcon(item, onExpand, onCollapse, c) {
    if (item.children.length > 0) {
        return item.isExpanded ?
            <Button
                className={c.iconBtn}
                icon='chevron-down'
                onClick={() => onCollapse(item.id)}
                minimal
                small
            />
            :
            <Button
                className={c.iconBtn}
                icon='chevron-right'
                onClick={() => onExpand(item.id)}
                minimal
                small
            />
    }

    return <Icon className={c.dot} icon='dot' color='lightgrey'/>;
}

export default Item;