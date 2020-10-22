import sampleText from './sample-text';
import {mutateTree} from "@atlaskit/tree";

const app = {
    state: {
        sampleText,
        selectedConcept: null,
        selectedTextRange: null,
        annotations: [
            {
                color: "lightgreen",
                offset: {"start": 45, "end": 67},
                type: "section"
            }
        ],
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
        removeConcept: (state, conceptIdx) => ({
            ...state,
            ontology: [
                ...state.ontology.slice(0, conceptIdx),
                ...state.ontology.slice(conceptIdx + 1)
            ]
        }),
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
        // createTag(state, selection) {
        //     const start = Math.min(selection.anchorOffset, selection.focusOffset);
        //     const end = Math.max(selection.anchorOffset, selection.focusOffset);
        //
        //     return {
        //         ...state,
        //         annotations: [
        //             ...state.annotations,
        //             {
        //                 color: 'lightgreen',
        //                 offset: {start, end},
        //                 type: 'section',
        //             }
        //         ]
        //     }
        // }
    },
    effects: {}
};

export default app;