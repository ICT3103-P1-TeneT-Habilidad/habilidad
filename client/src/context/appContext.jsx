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
    CREATE_COURSE_BEGIN,
    CREATE_COURSE_SUCCESS,
    // CREATE_COURSE_ERROR,
    GET_ALL_TOPICS_BEGIN,
    GET_ALL_TOPICS_SUCCESS,
} from './action'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

export const initialState = {
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,

    showNavbarModal: false,
    openModal: false,
    loginFail: false,
    showAlert: false,
    redirect: true,

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

    const addUserToLocalStorage = ({ result, token }) => {
        localStorage.setItem('user', JSON.stringify(result))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
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
            const { result, token } = data
            console.log(data)
            dispatch({
                type: SET_USER_SUCCESS,
                payload: { result, token },
            })
            addUserToLocalStorage({ result, token })
        } catch (err) {
            dispatch({
                type: SET_USER_ERROR,
                payload: { msg: err.response.data.error.message },
            })
        }
    }

    const logout = () => {
        dispatch({ type: LOGOUT })
        removeUserFromLocalStorage()
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

    const createNewCourse = async (course_data) => {
        dispatch({ type: CREATE_COURSE_BEGIN })
        try {
            const { data } = await authFetch.post(`/api/course/create`, course_data)
            const { result } = data
            dispatch({
                type: CREATE_COURSE_SUCCESS,
            })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            console.log(error.response)
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
