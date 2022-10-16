import { FORGET_PASSWORD, SHOW_MODAL } from './action'

import { initialState } from './appContext'

const reducer = (state, action) => {
    switch (action.type) {
        case FORGET_PASSWORD:
            return {
                ...state,
            }
        case SHOW_MODAL:
            return {
                ...state,
                openModal: !state.openModal,
            }
        default:
            throw new Error(`no such action: ${action.type}`)
    }
}

export default reducer
