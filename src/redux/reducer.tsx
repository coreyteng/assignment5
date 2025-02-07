import { CHANGE_NAME } from './action'

const initialState = {
    newName: 'Avon'
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                newName: action.payload.newName
            }
        default:
            return state
    }
}