import React, { useReducer, useContext } from 'react'
// import axios from 'axios'
import reducer from './reducer'
import axios from '../utils/axios'

import {
    LOGIN_USER,
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
} from './action'

const access_token = localStorage.getItem('access_token')
const refresh_token = localStorage.getItem('refresh_token')
const user = localStorage.getItem('user')

export const initialState = {
    user: user ? JSON.parse(user) : null,
    access_token: access_token ? access_token : null,
    refresh_token: refresh_token ? refresh_token : null,

    showNavbarModal: false,
    openModal: false,
    loginFail: false,
    showAlert: false,
    isLoading: false,

    user_data: {},
    user_type: '',
    alert_msg: '',
    alert_type: '',
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios

    // interceptors
    authFetch.interceptors.request.use(
        (config) => {
            console.log(config)
            config.headers['Authorization'] = `Bearer ${state.access_token}`
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
            if (err.response.status === 401) {
                logout()
            }
            return Promise.reject(err)
        }
    )

    const addUserToLocalStorage = ({ result, access_token, refresh_token }) => {
        localStorage.setItem('user', JSON.stringify(result))
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
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

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 5000)
    }

    const setUser = async (user_data) => {
        dispatch({ type: SET_USER_BEGIN })
        try {
            const { data } = await axios.post(`api/users/login`, user_data)
            const { result, access_token, refresh_token } = data
            console.log(data)
            dispatch({
                type: SET_USER_SUCCESS,
                payload: { result, access_token, refresh_token },
            })
            addUserToLocalStorage({ result, access_token, refresh_token })
        } catch (err) {
            dispatch({
                type: SET_USER_ERROR,
                payload: { msg: err.response.data.error.message },
            })
        }
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

    const logout = () => {
        dispatch({ type: LOGOUT })
        removeUserFromLocalStorage()
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                showModal,
                setUserType,
                clearValues,
                clearAlert,
                setUser,
                logout,
                createUser,
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
