import {
    LOADING,
    FETCHED_EVENTS,
    CHANGE_DISPLAY_TYPE,
    CHANGE_FILTER,
    ADD_EVENT,
} from '../actions/types'
    
const initialState = {
    events: [],
    displayType: 'grid',
    filter: null,
    loading: false,
}
    
export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case FETCHED_EVENTS:
            return {
                ...state,
                loading: false,
                events: action.payload
            }
        case CHANGE_DISPLAY_TYPE:
            return {
                ...state,
                displayType: action.payload
            }
        case CHANGE_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events],
                loading: false
            }
        default:
            return state
    }
}