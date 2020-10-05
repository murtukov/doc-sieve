import sampleText from './sample-text';

const app = {
    state: {
        sampleText,
        entities: [],
        tags: [
            {
                color: "lightgreen",
                offset: {"start": 45, "end": 67},
                type: "section"
            }
        ],
    },
    reducers: {
        addEntity: (state, newEntity) => ({
            ...state,
            entities: [
                ...state.entities,
                newEntity
            ]
        }),
        createTag(state, selection) {
            const start = Math.min(selection.anchorOffset, selection.focusOffset);
            const end = Math.max(selection.anchorOffset, selection.focusOffset);

            return {
                ...state,
                tags: [
                    ...state.tags,
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