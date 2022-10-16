import React, { useReducer, useContext } from 'react'
// import axios from 'axios'
import reducer from './reducer'
import { FORGET_PASSWORD, SHOW_MODAL } from './action'

// const token = localStorage.getItem('token');

export const initialState = {
    showLoginModal: false,
    openModal: false,
    // token: token ? token : null,
}

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showModal = () => {
    dispatch({
      type: SHOW_MODAL
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        showModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };