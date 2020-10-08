import sampleText from './sample-text';

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
        normalized: {
            entities: {
                nodes: {
                    '0': {
                        id: 0,
                        hasCaret: true,
                        icon: 'folder-close',
                        label: 'Folder 0'
                    },
                    '1': {
                        id: 1,
                        icon: 'folder-close',
                        isExpanded: true,
                        label: "I'm a folder <3",
                        childNodes: [
                            2,
                            3,
                            4
                        ]
                    },
                    '2': {
                        id: 2,
                        icon: 'folder-close',
                        label: 'Super secret files',
                        secondaryLabel: 'eye-icon',
                        hasCaret: true,
                        disabled: true
                    },
                    '3': {
                        id: 3,
                        icon: 'tag-icon',
                        label: 'Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.'
                    },
                    '4': {
                        id: 4,
                        hasCaret: true,
                        icon: 'folder-close',
                        label: 'Folder 2',
                        childNodes: [
                            5,
                            6,
                            7
                        ]
                    },
                    '5': {
                        id: 5,
                        label: 'No-Icon Item'
                    },
                    '6': {
                        id: 6,
                        icon: 'tag',
                        label: 'Item 1'
                    },
                    '7': {
                        id: 7,
                        hasCaret: true,
                        icon: 'folder-close',
                        label: 'Folder 3',
                        childNodes: [
                            8,
                            9
                        ]
                    },
                    '8': {
                        id: 8,
                        icon: 'document',
                        label: 'Item 0'
                    },
                    '9': {
                        id: 9,
                        icon: 'tag',
                        label: 'Item 1'
                    }
                }
            },
            result: {
                nodes: [
                    0,
                    1,
                    2
                ]
            }
        }
    },
    reducers: {
        addConcept: (state, newConcept) => ({
            ...state,
            ontology: [
                ...state.ontology,
                newConcept
            ]
        }),
        removeConcept: (state, conceptIdx) => ({
            ...state,
            ontology: [
                ...state.ontology.slice(0, conceptIdx),
                ...state.ontology.slice(conceptIdx + 1)
            ]
        }),
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

export default app;