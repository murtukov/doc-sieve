import {mutateTree} from "@atlaskit/tree";

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
        addConcept: (state, newConcept) => {
            const tree = state.conceptTree;

            const newTree = {
                rootId: tree.rootId,
                items: {
                    ...tree.items,
                    [newConcept.name]: {
                        id: [newConcept.name],
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
                // new child id here
                newConcept.name
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