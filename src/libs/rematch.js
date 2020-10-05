import { init } from '@rematch/core'
import app from '../features/app/model';
import storage from 'redux-persist/lib/storage';
// import persistPlugin from '@rematch/persist'
//
// const persistConfig = {
//     key: 'root',
//     storage,
// }

const store = init({
    models: {app},
    // plugins: [persistPlugin(persistConfig)]
})

export default store