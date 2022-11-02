import React, { useReducer, useContext } from 'react'
// import axios from 'axios'
import reducer from './reducer'
import axios from '../utils/axios'

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
    // UPDATE_USER_BEGIN,
    // UPDATE_USER_SUCCESS,
    // UPDATE_USER_ERROR,
    // DELETE_USER_BEGIN,
    // DELETE_USER_SUCCESS,
    // DELETE_USER_ERROR,
    GET_ALL_COURSES_BEGIN,
    GET_ALL_COURSES_SUCCESS,
    // GET_ALL_COURSES_ERROR,
    GET_ALL_TOPICS_BEGIN,
    GET_ALL_TOPICS_SUCCESS,
    RESET_PASSWORD_LINK_BEGIN,
    RESET_PASSWORD_LINK_SUCCESS,
    RESET_PASSWORD_LINK_ERROR,
} from './action'

const token = localStorage.getItem('accessToken')

export const initialState = {
    token: token ? token : null,

    showNavbarModal: false,
    openModal: false,
    loginFail: false,
    showAlert: false,
    isLoading: false,

    user_data: {},
    user_type: '',
    alert_msg: '',
    alert_type: '',
    courses: null,
    topics: null,
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios

    // interceptors
    authFetch.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )

    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (err) => {
            console.log(err)
            if (err.response.status !== 401) {
                logout()
            }
            return Promise.reject(err)
        }
    )

    const addTokenToLocalStorage = ({ accessToken, refreshToken }) => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
    }

    const removeTokenFromLocalStorage = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    const showModal = () => {
        dispatch({
            type: SHOW_MODAL,
        })
    }

    const setUserType = (user_type) => {
        clearValues()
        dispatch({
            type: LOGIN_USER,
            payload: { user_type },
        })
    }

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const setUser = async (user_data) => {
        dispatch({ type: SET_USER_BEGIN })
        try {
            const { data } = await axios.post(`/api/users/login`, user_data)
            const { accessToken, refreshToken } = data.result
            console.log('data')
            console.log(data)
            dispatch({
                type: SET_USER_SUCCESS,
                payload: { accessToken, refreshToken },
            })
            addTokenToLocalStorage({ accessToken, refreshToken })
        } catch (err) {
            dispatch({
                type: SET_USER_ERROR,
                payload: { msg: err.response.data.error.message },
            })
        }
    }

    const logout = () => {
        dispatch({ type: LOGOUT })
        removeTokenFromLocalStorage()
    }

    const createUser = async (user_data) => {
        dispatch({ type: CREATE_USER_BEGIN })
        try {
            await axios.post(`/api/users/register`, user_data)
            dispatch({ type: CREATE_USER_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (err) {
            console.log(err)
            dispatch({
                type: CREATE_USER_ERROR,
                payload: { msg: err.response.data.error.message },
            })
        }
    }

    const getAllCourses = async () => {
        dispatch({ type: GET_ALL_COURSES_BEGIN })
        try {
            const { data } = await axios.get(`/api/course/`)
            const { result } = data
            dispatch({
                type: GET_ALL_COURSES_SUCCESS,
                payload: {
                    result,
                },
            })
        } catch (err) {
            console.log(err.response)
            logout()
        }
    }

    const getAllTopics = async () => {
        dispatch({ type: GET_ALL_TOPICS_BEGIN })
        try {
            const { data } = await axios.get(`/api/topics/`)
            const { result } = data
            dispatch({
                type: GET_ALL_TOPICS_SUCCESS,
                payload: {
                    result,
                },
            })
        } catch (err) {
            console.log(err.response)
            logout()
        }
    }

    const sendPasswordResetLink = async (email) => {
        dispatch({ type: RESET_PASSWORD_LINK_BEGIN })
        try {
            await axios.post(`api/users/resetPassword`, email)
            dispatch({
                type: RESET_PASSWORD_LINK_SUCCESS,
            })
        } catch (err) {
            if (err.response.status !== 401) {
                dispatch({
                    type: RESET_PASSWORD_LINK_ERROR,
                    payload: {
                        msg: err.response.data.message,
                    },
                })
            }
        }
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                showModal,
                setUserType,
                clearValues,
                setUser,
                logout,
                createUser,
                getAllCourses,
                getAllTopics,
                sendPasswordResetLink,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider }
