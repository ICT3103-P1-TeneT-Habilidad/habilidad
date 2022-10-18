import {
    CLEAR_VALUES,
    LOGIN_USER,
    SHOW_MODAL,
    SET_USER_BEGIN,
    SET_USER_SUCCESS,
    SET_USER_ERROR,
    LOGOUT,
} from './action'

import { initialState } from './appContext'

const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                openModal: !state.openModal,
            }
        case LOGIN_USER:
            return {
                ...state,
                user_type: action.payload.user_type,
            }
        case CLEAR_VALUES: {
            const initialState = {
                user_type: '',
                alert_msg: '',
            }
            return { ...state, ...initialState }
        }
        case SET_USER_BEGIN:
            return {
                ...state,
            }
        case SET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.result,
                token: action.payload.token,
            }
        case SET_USER_ERROR:
            return {
                ...state,
                loginFail: true,
                alert_msg: action.payload.msg,
            }
        case LOGOUT:
            return {
                ...initialState,
                user: null,
                token: null,
            }
        default:
            throw new Error(`no such action: ${action.type}`)
    }
}

export default reducer
