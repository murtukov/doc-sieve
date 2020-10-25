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
        addAnnotation: (state, annotation) => ({
            ...state,
            annotations: [...state.annotations, annotation]
        }),
        removeAnnotation: (state, annotation) => ({
            ...state,
            annotations: state.annotations.filter(el => el.id !== annotation.id)
        }),
    },
    effects: {}
};

export default app;