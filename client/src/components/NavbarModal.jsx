import React from 'react'
import { useAppContext } from '../context/appContext'

import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function NavbarModal() {
    const { showModal } = useAppContext()
    // const { setUserType } = useAppContext()

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Select to Login or Register</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => showModal()}
                            >
                                <AiOutlineClose className="text-md" />
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex m-auto content-center space-x-10 my-4 items-center">
                            <Link to="/register">
                                <button className="border bg-slate-100 p-4 rounded-md" onClick={() => showModal()}>
                                    Register
                                </button>
                            </Link>
                            <span>or</span>
                            <Link to="/login">
                                <button className="border bg-slate-100 p-4 rounded-md" onClick={() => showModal()}>
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
