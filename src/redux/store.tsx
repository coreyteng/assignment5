import reducer from './reducer'
import {legacy_createStore as createStore} from 'redux'

export default function configureStore() {
    let store = createStore(
        reducer
    )

    return store
}