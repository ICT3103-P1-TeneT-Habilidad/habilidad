import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from '../utils/axios'
// import service
import {
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
    CREATE_COURSE_BEGIN,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_ERROR,
    EDIT_COURSE_BEGIN,
    EDIT_COURSE_SUCCESS,
    EDIT_COURSE_ERROR,
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
    loginFail: false,
    showAlert: false,
    isLoading: false,

    user_data: {},
    user_type: '',
    alert_msg: '',
    alert_type: '',
    courses: null,
    topics: null,

    edit_course: null,
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios

    // interceptors
    authFetch.interceptors.request.use(
        (config) => {
            // config.headers['Authorization'] = `Bearer ${state.token}`
            const token = getAccessToken()
            if (token) {
                config.headers['x-access-token'] = token
            }

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
        async (err) => {
            const orgConfig = err.config
            if (orgConfig.url !== '/api/users/login' && err.response) {
                // access token expired
                if (err.response.status === 401 && !orgConfig._retry) {
                    orgConfig._retry = true

                    try {
                        const result = await authFetch.post('/api/refreshToken', {
                            refreshToken: getRefreshToken(),
                        })
                        const { accessToken } = result.data.result
                        updateAccessToken(accessToken)
                        return authFetch(orgConfig)
                    } catch (_err) {
                        return Promise.reject(_err)
                    }
                }
            }
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
            console.log(data)
            dispatch({
                type: SET_USER_SUCCESS,
                payload: result,
            })
            setUser(result)
        } catch (err) {
            dispatch({
                type: SET_USER_ERROR,
                payload: { msg: err.response.data.result.message },
            })
        }
    }

    const logout = () => {
        dispatch({ type: LOGOUT })
        removeUser()
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
                payload: { msg: err.response.data.result.message },
            })
        }
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

    const setEditCourseDetails = (course_data) => {
        dispatch({ type: EDIT_COURSE_BEGIN, payload: course_data })
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
                login,
                logout,
                createUser,
                getAllCourses,
                getAllTopics,
                sendPasswordResetLink,
                createNewCourse,
                setEditCourseDetails,
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
