import {mutateTree} from "@atlaskit/tree";
import { v4 as uuidv4 } from 'uuid';
import {highlighter} from '../workspace/Workspace';

const app = {
    state: {
        selectedConcept: null,
        selectedTextRange: null,
        annotations: [],
        conceptTree: {
            rootId: 'root',
            items: {
                'root': {
                    id: 'root',
                    children: [],
                    // hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        name: 'root',
                    },
                },
            },
        },
        text: '', // editor text
    },
    reducers: {
        setText: (state, text) => ({...state, text}),
        addConcept: (state, newConcept) => {
            const tree = state.conceptTree;

            const uuid = uuidv4();

            const newTree = {
                rootId: tree.rootId,
                items: {
                    ...tree.items,
                    [uuid]: {
                        id: uuid,
                        children: [],
                        // hasChildren: false,
                        isExpanded: false,
                        isChildrenLoading: false,
                        data: newConcept,
                    },
                },
            };

            const newChildren = [
                ...tree.items[newConcept.parentId || 'root'].children,
                uuid
            ];

            return ({
                ...state,
                conceptTree: mutateTree(newTree, newConcept.parentId || 'root', { children: newChildren })
            });
        },
        removeConcept: (state, conceptId) => {
            const newTree = {...state.conceptTree};
            const removedConcepts = removeTreeBranch(newTree.items, conceptId);

            return ({
                ...state,
                conceptTree: mutateTree(newTree, 'root', {}),
                annotations: filterAnnotationsByConceptId(state.annotations, removedConcepts)
            });
        },
        setConceptTree: (state, newTree) => ({
            ...state,
            conceptTree: newTree
        }),
        setSelectedConcept: (state, concept) => ({
            ...state,
            selectedConcept: concept
        }),
        setSelectedTextRange: (state, selectedTextRange) => ({
            ...state,
            selectedTextRange
        }),
        addAnnotation: (state, annotation) => {
            return ({
                ...state,
                annotations: [...state.annotations, annotation]
            });
        },
        setAnnotations: (state, annotations) => ({
            ...state,
            annotations
        }),
        removeAnnotation: (state, annotation) => ({
            ...state,
            annotations: state.annotations.filter(a => a.id !== annotation.id)
        }),
    },
    effects: {}
};

/**
 * @param {array}  items
 * @param {string} conceptId
 * @param {array}  removedConcepts
 * @return {array}
 */
function removeTreeBranch(items, conceptId, removedConcepts = []) {
    removedConcepts.push(conceptId);

    let children = items[conceptId].children;

    // Remove the element itself
    purgeTreeFromItem(items, conceptId);

    // Remove it's children
    for (let child of children) {
        removeTreeBranch(items, child, removedConcepts);
    }

    return removedConcepts;
}

function purgeTreeFromItem(items, itemId) {
    delete items[itemId]

    Object.keys(items).forEach(i => {
        const index = items[i].children.indexOf(itemId);
        if (index > -1) {
            items[i].children.splice(index, 1);

            if (items[i].children.length === 0) {
                // items[i].hasChildren = false;
                items[i].isExpanded = false;
            }
        }
    });
}

function filterAnnotationsByConceptId(annotations, removedConcepts) {
    return annotations.filter(a => {
        if (!removedConcepts.includes(a.data.conceptId)) {
            return true;
        }
        highlighter.current.undraw(a);
        return false;
    });
}

export default app;