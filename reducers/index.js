import { RECEIVE_CARDS } from '../actions'

function cards(state = {}, action) {
    switch (action.type) {

        case RECEIVE_CARDS: {
            return { ...state, ...action.entries }
        }

        default:
            return state
    }
}

export default cards