import sampleText from './sample-text';

const app = {
    state: {
        sampleText,
        entities: [],
        tags: [],
    },
    reducers: {
        addEntity: (state, newEntity) => ({
            ...state,
            entities: [
                ...state.entities,
                newEntity
            ]
        })
    },
    effects: {}
};

export default app;