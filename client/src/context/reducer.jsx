import {
    LOGIN_USER,
    SHOW_MODAL,
    CLEAR_VALUES,
    SET_USER_BEGIN,
    SET_USER_SUCCESS,
    SET_USER_ERROR,
    LOGOUT,
    CREATE_USER_BEGIN,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER_BEGIN,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
} from './action'

import { initialState } from './appContext'

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user_type: action.payload.user_type,
            }
        case SHOW_MODAL:
            return {
                ...state,
                openModal: !state.openModal,
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
        case CREATE_USER_BEGIN:
            return {
                ...state
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                showAlert: true,
                alert_msg: "Registered"
            }
        case CREATE_USER_ERROR:
            return {
                ...state,
                showAlert: true,
                alert_msg: action.payload.msg
            }
        default:
            throw new Error(`no such action: ${action.type}`)
    }
}

export default reducer
