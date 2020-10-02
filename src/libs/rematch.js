import { init } from '@rematch/core'
import app from '../features/app/model';

const store = init({
    models: {app},
})

export default store