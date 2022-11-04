import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from '../utils/axios'
import {
    SHOW_MODAL,
    CLEAR_ALERT,
    LOGOUT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGIN_OTP_BEGIN,
    LOGIN_OTP_SUCCESS,
    LOGIN_OTP_ERROR,
    CREATE_USER_BEGIN,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    // DELETE_USER_BEGIN,
    // DELETE_USER_SUCCESS,
    // DELETE_USER_ERROR,
    GET_ALL_COURSES_BEGIN,
    GET_ALL_COURSES_SUCCESS,
    // GET_ALL_COURSES_ERROR,
    GET_ONE_COURSE_BEGIN,
    GET_ONE_COURSE_SUCCESS,
    GET_ONE_COURSE_ERROR,
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
    // GET_ONE_COURSE_BEGIN,
    // GET_ONE_COURSE_SUCCESS,
    // GET_ONE_COURSE_ERROR,
    // GET_ALL_PURCHASED_COURSES_BEGIN,
    // GET_ALL_PURCHASED_COURSES_SUCCESS,
    // GET_ALL_PURCHASED_COURSES_ERROR,
    // GET_ALL_POPULAR_COURSES_BEGIN,
    // GET_ALL_POPULAR_COURSES_SUCCESS,
    // GET_ALL_POPULAR_COURSES_ERROR,
    // GET_ALL_TOP_COURSES_BEGIN,
    // GET_ALL_TOP_COURSES_SUCCESS,
    // GET_ALL_TOP_COURSES_ERROR,
    GET_COURSE_BY_TOPIC_BEGIN,
    GET_COURSE_BY_TOPIC_SUCCESS,
    GET_COURSE_BY_TOPIC_ERROR,
} from './action'

const user = localStorage.getItem('user')

export const initialState = {
    user: user ? JSON.parse(user) : null,

    showNavbarModal: false,
    openModal: false,
    showAlert: false,
    isLoading: false,
    loginOtp: false,

    user_data: {},
    alert_msg: '',
    alert_type: '',
    courses: null,
    topics: null,
    courseDetail: null,

    edit_course: null,
    courses_topics: null,

    user_details: {},
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios

    // interceptors
    authFetch.interceptors.request.use(
        (config) => {
            if (user) {
                const { accessToken } = JSON.parse(user)
                config.headers['authorization'] = `Bearer ${accessToken}`
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
            console.log(err)
            const originalConfig = err.config
            if (err.response) {
                // If access token is expired
                if (err.response.data.result.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true
                    try {
                        const { refreshToken } = JSON.parse(user)

                        // const { data } = await axios.post(`/api/users/verifyOTP`, user_data)
                        // const result = data.result.data
                        // console.log(result)
                        // dispatch({ type: SETUP_USER_SUCCESS, payload: { user: result, msg: 'Success' } })

                        const { data } = await authFetch.post('/api/users/refreshAccessToken', {
                            refreshToken,
                        })
                        const result = data.result.data
                        initialState.user = result
                        setUser(result)

                        const { accessToken } = result
                        updateAccessToken(accessToken)
                        // authFetch.headers['authorization'] = `Bearer ${accessToken}`
                        authFetch.headers = {
                            ...authFetch.headers,
                            authorization: `Bearer ${accessToken}`,
                        }

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
        console.log(user)
        return user?.refreshToken
    }

    const getAccessToken = () => {
        const user = localStorage.getItem('user')
        console.log(user)

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

    const refreshToken = () => {
        return axios.post('/api/users/refreshAccessToken', { refreshToken: getRefreshToken })
    }

    const sendLoginOtp = async (user_data) => {
        dispatch({ type: LOGIN_OTP_BEGIN })
        try {
            await axios.post(`/api/users/login`, user_data)
            dispatch({
                type: LOGIN_OTP_SUCCESS,
                payload: { msg: 'Successfully Login' },
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: LOGIN_OTP_ERROR,
                payload: { msg: err.response.data.result.message },
            })
        }
        clearAlert()
    }

    const login = async (user_data) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(`/api/users/verifyOTP`, user_data)
            const result = data.result.data
            console.log(result)
            dispatch({ type: SETUP_USER_SUCCESS, payload: { user: result, msg: 'Success' } })
            setUser(result)
        } catch (err) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: {
                    msg: err.response.data.result.message,
                },
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
                payload: { msg: 'Account Successfully Created' },
            })
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
            const result = data.result.data
            console.log(result)
            dispatch({
                type: GET_ALL_TOPICS_SUCCESS,
                payload: {
                    result,
                },
            })
        } catch (err) {
            console.log(err.response)
            // logout()
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
            console.log(err)
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
        } catch (err) {
            dispatch({
                type: CREATE_COURSE_ERROR,
                payload: { msg: err.response.data.result.message },
            })
        }
    }

    const getCourseDetail = async (courseId) => {
        dispatch({
            type: GET_ONE_COURSE_BEGIN,
        })

        try {
            const { data } = await authFetch.get(`/api/course/${courseId}`)
            const { result } = data
            dispatch({
                type: GET_ONE_COURSE_SUCCESS,
                payload: { result },
            })
        } catch (err) {
            dispatch({
                type: GET_ONE_COURSE_ERROR,
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

    // const getAllPopularCourses = async () => {
    //     dispatch({ type: GET_ALL_POPULAR_COURSES_BEGIN })
    //     try {
    //         const { data } = await axios.get('/api/course/popularCourses')
    //     } catch (err) {
    //         dispatch({ type: GET_ALL_POPULAR_COURSES_ERROR, payload: { msg: err.response.data.result.message } })
    //     }
    // }

    const getUserDetails = async () => {
        dispatch({ type: GET_USER_BEGIN })
        try {
            const { data } = await axios.get(`/api/users/`)
            const result = data.result
            dispatch({
                type: GET_USER_SUCCESS,
                payload: {
                    result,
                },
            })
        } catch (err) {
            dispatch({ type: GET_USER_ERROR })
        }
    }

    const updateUserDetails = async (user_data) => {
        console.log(user_data)
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await axios.patch(`/api/users/`, user_data)
            const result = data.result
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { result },
            })
        } catch (err) {
            dispatch({ type: UPDATE_USER_ERROR })
        }
    }

    const getCourseByTopic = async (topicName) => {
        dispatch({ type: GET_COURSE_BY_TOPIC_BEGIN })
        console.log(topicName)
        try {
            const { data } = await axios.post(`/api/course/byCategory`, { topicName })
            const result = data.result
            dispatch({
                type: GET_COURSE_BY_TOPIC_SUCCESS,
                payload: { result },
            })
        } catch (err) {
            dispatch({ type: GET_COURSE_BY_TOPIC_ERROR })
        }
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
                login,
                removeUser,
                showModal,
                clearAlert,
                sendLoginOtp,
                logout,
                createUser,
                getAllCourses,
                getAllTopics,
                sendPasswordResetLink,
                createNewCourse,
                getUserDetails,
                updateUserDetails,
                getCourseByTopic,
                getCourseDetail,
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
