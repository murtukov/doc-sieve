import {mutateTree} from "@atlaskit/tree";
import { v4 as uuidv4 } from 'uuid';

const app = {
    state: {
        text: '', // editor text
        selectedConcept: null,
        selectedTextRange: null,
        annotations: [],
        conceptTree: {
            rootId: 'root',
            items: {
                'root': {
                    id: 'root',
                    children: [],
                    hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        name: 'root',
                    },
                },
            },
        }
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
                        hasChildren: false,
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
            const tree = state.conceptTree;

            const newTree = {
                rootId: tree.rootId,
                items: {
                    ...tree.items,
                },
            };

            removeTreeBranch(newTree.items, conceptId);

            return ({
                ...state,
                conceptTree: mutateTree(newTree, 'root', {})
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

function removeTreeBranch(items, branchId) {
    const children = items[branchId].children;

    // Remove the element itself
    purgeTreeFromItem(items, branchId);

    // Remove it's children
    for (let child of children) {
        removeTreeBranch(items, child);
    }
}

function purgeTreeFromItem(items, itemId) {
    delete items[itemId]

    Object.keys(items).forEach(i => {
        const index = items[i].children.indexOf(itemId);
        if (index > -1) {
            items[i].children.splice(index, 1);
        }
    });
}

export default app;