import sampleText from './sample-text';
import {mutateTree} from "@atlaskit/tree";

const app = {
    state: {
        sampleText,
        ontology: [],
        annotations: [
            {
                color: "lightgreen",
                offset: {"start": 45, "end": 67},
                type: "section"
            }
        ],
        conceptTree: {
            rootId: 0,
            items: {
                0: {
                    id: 0,
                    children: [1, 2],
                    hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        title: 'root',
                    },
                },
                1: {
                    id: 1,
                    children: [3, 4],
                    hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        title: 'First parent',
                    },
                },
                2: {
                    id: 2,
                    children: [5, 6],
                    hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        title: 'Second parent',
                    },
                },
                3: {
                    id: 3,
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        title: 'Child one',
                    },
                },
                4: {
                    id: 4,
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        title: 'Child two',
                    },
                },
                5: {
                    id: 5,
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        title: 'Child three',
                    },
                },
                6: {
                    id: 6,
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        title: 'Child four',
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
        removeConcept: (state, conceptIdx) => ({
            ...state,
            ontology: [
                ...state.ontology.slice(0, conceptIdx),
                ...state.ontology.slice(conceptIdx + 1)
            ]
        }),
        setConceptTree(state, newTree) {
            return {
                ...state,
                conceptTree: newTree
            };
        },
        createTag(state, selection) {
            const start = Math.min(selection.anchorOffset, selection.focusOffset);
            const end = Math.max(selection.anchorOffset, selection.focusOffset);

            return {
                ...state,
                annotations: [
                    ...state.annotations,
                    {
                        color: 'lightgreen',
                        offset: {start, end},
                        type: 'section',
                    }
                ]
            }
        }
    },
    effects: {}
};

/**
 * Pushes an object into another object. ID is generated automatically and copied into the 'item' object
 */
function push(object, item) {
    for (let i = 0;; ++i) {
        if (i in object) {
            continue;
        }

        item.id = i;
        object[i] = item;
        return i;
    }
}

export default app;