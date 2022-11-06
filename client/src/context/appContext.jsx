import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from '../utils/axios'
import {
    SHOW_MODAL,
    CLEAR_ALERT,
    LOGOUT,
    CLEAR_VALUES,
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
    ACTIVATE_USER_BEGIN,
    ACTIVATE_USER_SUCCESS,
    ACTIVATE_USER_ERROR,
    DEACTIVATE_USER_BEGIN,
    DEACTIVATE_USER_SUCCESS,
    DEACTIVATE_USER_ERROR,
    RESET_PASSWORD_LINK_BEGIN,
    RESET_PASSWORD_LINK_SUCCESS,
    RESET_PASSWORD_LINK_ERROR,
    GET_ALL_USERS_BEGIN,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR,
    GET_ALL_COURSES_BEGIN,
    GET_ALL_COURSES_SUCCESS,
    // GET_ONE_COURSE_BEGIN,
    // GET_ONE_COURSE_SUCCESS,
    // GET_ONE_COURSE_ERROR,
    GET_ALL_PURCHASED_COURSES_BEGIN,
    GET_ALL_PURCHASED_COURSES_SUCCESS,
    GET_ALL_PURCHASED_COURSES_ERROR,
    GET_ALL_POPULAR_COURSES_BEGIN,
    GET_ALL_POPULAR_COURSES_SUCCESS,
    GET_ALL_POPULAR_COURSES_ERROR,
    CREATE_COURSE_BEGIN,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_ERROR,
    EDIT_COURSE_BEGIN,
    EDIT_COURSE_SUCCESS,
    EDIT_COURSE_ERROR,
    GET_ONE_COURSE_BEGIN,
    GET_ONE_COURSE_SUCCESS,
    GET_ONE_COURSE_ERROR,
    GET_ALL_TOPICS_BEGIN,
    GET_ALL_TOPICS_SUCCESS,
    GET_ALL_TOPICS_ERROR,
    GET_COURSE_BY_TOPIC_BEGIN,
    GET_COURSE_BY_TOPIC_SUCCESS,
    GET_COURSE_BY_TOPIC_ERROR,
    GET_TOP_TOPICS_BEGIN,
    GET_TOP_TOPICS_SUCCESS,
    GET_TOP_TOPICS_ERROR,
    APPROVE_COURSE_BEGIN,
    APPROVE_COURSE_SUCCESS,
    APPROVE_COURSE_ERROR,
    GET_CREATED_COURSE_BEGIN,
    GET_CREATED_COURSE_SUCCESS,
    GET_CREATED_COURSE_ERROR,
} from './action'

const user = localStorage.getItem('user')

export const initialState = {
    user: user ? JSON.parse(user) : null,

    showNavbarModal: false,
    openModal: false,
    showAlert: false,
    isLoading: false,
    loginOtp: false,

    user_data: null, // to store all users
    alert_msg: '',
    alert_type: '',
    courses: null,
    topics: null,
    courseDetail: null,

    edit_course: null,
    courses_topics: null,
    top_topics: null,
    popular_course: null,
    purchased_courses: null,
    created_courses: null,

    user_details: {},
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios

    // interceptors
    authFetch.interceptors.request.use(
        (config) => {
            const newUser = getUser()
            if (newUser) {
                const { accessToken } = newUser
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
                if (err.response.data.result.status === 401 && !originalConfig._retry && user) {
                    originalConfig._retry = true
                    try {
                        const newUser = getUser()

                        const { refreshToken } = newUser

                        // const { data } = await axios.post(`/api/users/verifyOTP`, user_data)
                        // const result = data.result.data
                        // console.log(result)
                        // dispatch({ type: SETUP_USER_SUCCESS, payload: { user: result, msg: 'Success' } })

                        const { data } = await authFetch.post('/api/users/refreshAccessToken', {
                            refreshToken,
                        })
                        const result = data.result.data
                        setUser(result)

                        const { accessToken } = result
                        // authFetch.headers['authorization'] = `Bearer ${accessToken}`
                        originalConfig.headers = {
                            ...originalConfig.headers,
                            authorization: `Bearer ${accessToken}`,
                        }

                        return authFetch(originalConfig)
                    } catch (_error) {
                        removeUser()
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
        return JSON.parse(user)?.refreshToken
    }

    const getAccessToken = () => {
        const user = localStorage.getItem('user')
        return JSON.parse(user)?.accessToken
    }

    const updateAccessToken = (token) => {
        let user = localStorage.getItem('user')
        user.accessToken = token
        localStorage.setItem('user', user)
    }

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'))
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
                payload: { msg: 'OTP is sent to your email!' },
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
                    msg: 'Invalid OTP',
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
            console.log(result)
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
            dispatch({ type: GET_ALL_TOPICS_ERROR })
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

    const getCourseDetailNoAuth = async (courseId) => {
        dispatch({
            type: GET_ONE_COURSE_BEGIN,
        })
        try {
            const { data } = await authFetch.get(`/api/course/viewCourse/${courseId}`)
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

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

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

    const getAllUsers = async () => {
        dispatch({ type: GET_ALL_USERS_BEGIN })
        try {
            const { data } = await authFetch.get(`/api/users/allUsers`)
            const result = data.data
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: { result },
            })
        } catch (err) {
            dispatch({ type: GET_ALL_USERS_ERROR })
        }
    }

    const editCourse = async (courseId, course) => {
        dispatch({ type: EDIT_COURSE_BEGIN })
        try {
            await axios.put(`/api/course/${courseId}`, course)
            dispatch({
                type: EDIT_COURSE_SUCCESS,
            })
        } catch (err) {
            dispatch({ type: EDIT_COURSE_ERROR })
        }
    }

    const getTopTopics = async () => {
        dispatch({ type: GET_TOP_TOPICS_BEGIN })
        try {
            const { data } = await axios.get(`/api/topics/popularTopics`)
            const result = data.result.data
            dispatch({
                type: GET_TOP_TOPICS_SUCCESS,
                payload: result,
            })
        } catch (err) {
            dispatch({ type: GET_TOP_TOPICS_ERROR })
        }
    }

    const getPopularCourses = async () => {
        dispatch({ type: GET_ALL_POPULAR_COURSES_BEGIN })
        try {
            const { data } = await axios.get(`/api/course/popularCourses`)
            const result = data.result.data
            dispatch({
                type: GET_ALL_POPULAR_COURSES_SUCCESS,
                payload: result,
            })
        } catch (err) {
            dispatch({ type: GET_ALL_POPULAR_COURSES_ERROR })
        }
    }

    const activateUser = async () => {
        dispatch({ type: ACTIVATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch(`api/users/reactivate`)
            const result = data.result
            dispatch({ type: ACTIVATE_USER_SUCCESS, payload: result })
        } catch (err) {
            dispatch({ type: ACTIVATE_USER_ERROR })
        }
        getAllUsers()
    }

    const deactivateUser = async (data) => {
        console.log(data)
        dispatch({ type: DEACTIVATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch(`api/users/deactivate`)
            const result = data.result
            dispatch({ type: DEACTIVATE_USER_SUCCESS, payload: result })
        } catch (err) {
            dispatch({ type: DEACTIVATE_USER_ERROR })
        }
        getAllUsers()
    }

    const updateCourseApproval = async (course_data) => {
        dispatch({ type: APPROVE_COURSE_BEGIN })
        try {
            const { data } = await authFetch.patch(`api/course/${course_data.courseId}`, course_data.status)
            const result = data.result
            dispatch({ type: APPROVE_COURSE_SUCCESS })
        } catch (err) {
            dispatch({ type: APPROVE_COURSE_ERROR })
        }
        getAllCourses()
    }

    const getPurchasedCourses = async () => {
        dispatch({ type: GET_ALL_PURCHASED_COURSES_BEGIN })
        try {
            const { data } = await authFetch.get(`api/course/purchased`)
            const result = data.result
            dispatch({ type: GET_ALL_PURCHASED_COURSES_SUCCESS, payload: result })
        } catch (err) {
            dispatch({ type: GET_ALL_PURCHASED_COURSES_ERROR })
        }
    }

    const getCreatedCoursesByInstructor = async () => {
        dispatch({ type: GET_ALL_PURCHASED_COURSES_BEGIN })
        try {
            const { data } = await authFetch.get(`api/course/created`)
            const result = data.result
            dispatch({ type: GET_ALL_PURCHASED_COURSES_SUCCESS, payload: result })
        } catch (err) {
            dispatch({ type: GET_ALL_PURCHASED_COURSES_ERROR })
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
                getAllUsers,
                editCourse,
                getTopTopics,
                refreshToken,
                getPopularCourses,
                activateUser,
                deactivateUser,
                clearValues,
                updateCourseApproval,
                getPurchasedCourses,
                getCreatedCoursesByInstructor,
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
