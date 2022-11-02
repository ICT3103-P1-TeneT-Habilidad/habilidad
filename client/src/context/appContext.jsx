import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from '../utils/axios'
import {
    SHOW_MODAL,
    CLEAR_VALUES,
    CLEAR_ALERT,
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
    CREATE_COURSE_BEGIN,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_ERROR,
    GET_ALL_TOPICS_BEGIN,
    GET_ALL_TOPICS_SUCCESS,
    RESET_PASSWORD_LINK_BEGIN,
    RESET_PASSWORD_LINK_SUCCESS,
    RESET_PASSWORD_LINK_ERROR,
} from './action'

const user = localStorage.getItem('user')

export const initialState = {
    user: user ? JSON.parse(user) : null,

    showNavbarModal: false,
    openModal: false,
    // loginFail: false,
    showAlert: false,
    isLoading: false,

    user_data: {},
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
            const token = getAccessToken()
            if (token) {
                config.headers.common['authorization'] = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    authFetch.interceptors.response.use(
        (res) => {
            return res
        },
        async (err) => {
            const originalConfig = err.config
            if (err.response) {
                // If access token is expired
                if (err.response.data.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true

                    try {
                        const rs = await getRefreshToken()
                        const { accessToken } = rs.data
                        updateAccessToken(accessToken)
                        authFetch.headers.common['authorization'] = `Bearer ${accessToken}`

                        return authFetch(originalConfig)
                    } catch (_error) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data)
                        }

                        return Promise.reject(_error)
                    }
                }

                if (err.response.data.status === 403 && err.response.data) {
                    return Promise.reject(err.response.data)
                }
            }

            return Promise.reject(err)
        }
    )

    const getRefreshToken = () => {
        const user = localStorage.getItem('user')
        return user?.refreshToken
    }

    const getAccessToken = () => {
        const user = localStorage.getItem('user')
        return user?.accessToken
    }

    const updateAccessToken = (token) => {
        let user = localStorage.getItem('user')
        user.accessToken = token
        localStorage.setItem('user', JSON.stringify(user))
    }

    const getUser = () => {
        return localStorage.getItem('user')
    }

    const setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const removeUser = () => {
        localStorage.removeItem('user')
    }

    const showModal = () => {
        dispatch({
            type: SHOW_MODAL,
        })
    }

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const login = async (user_data) => {
        dispatch({ type: SET_USER_BEGIN })
        try {
            const { data } = await axios.post(`/api/users/login`, user_data)
            const result = data.result
            dispatch({
                type: SET_USER_SUCCESS,
                payload: { user: result, msg: 'Successfully Login' },
            })
            setUser(result)
        } catch (err) {
            console.log(err)
            dispatch({
                type: SET_USER_ERROR,
                payload: { msg: err.response.data.result.message },
            })
        }
        clearAlert()
    }

    const logout = () => {
        dispatch({ type: LOGOUT })
        removeUser()
    }

    const createUser = async (user_data) => {
        dispatch({ type: CREATE_USER_BEGIN })
        try {
            await axios.post(`/api/users/register`, user_data)
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: { msg: 'Successfully Created' },
            })
            dispatch({ type: CLEAR_VALUES })
        } catch (err) {
            console.log(err)
            dispatch({
                type: CREATE_USER_ERROR,
                payload: { msg: err.response.data.result.message },
            })
        }
        clearAlert()
    }

    const getAllCourses = async () => {
        dispatch({ type: GET_ALL_COURSES_BEGIN })
        try {
            const { data } = await axios.get(`/api/course/`)
            const result = data.result.data
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

    const createNewCourse = async (course_data) => {
        dispatch({ type: CREATE_COURSE_BEGIN })
        try {
            await authFetch.post(`/api/course/create`, course_data)
            dispatch({
                type: CREATE_COURSE_SUCCESS,
            })
            dispatch({ type: CLEAR_VALUES })
        } catch (err) {
            console.log(err.response)
            dispatch({
                type: CREATE_COURSE_ERROR,
                payload: { msg: err.response.data.result.message },
            })
        }
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 5000)
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                getRefreshToken,
                getAccessToken,
                updateAccessToken,
                getUser,
                setUser,
                removeUser,
                showModal,
                clearValues,
                clearAlert,
                login,
                logout,
                createUser,
                getAllCourses,
                getAllTopics,
                sendPasswordResetLink,
                createNewCourse,
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
