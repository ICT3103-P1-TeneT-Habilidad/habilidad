import React from 'react'
import { useAppContext } from '../context/appContext'

import { AiOutlineClose } from 'react-icons/ai'

export default function LoginModal() {
    const { showModal } = useAppContext()

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Log in as...</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => showModal()}
                            >
                                {/* <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span> */}
                                <AiOutlineClose className='text-md'/>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex m-auto content-center space-x-10 my-4 items-center">
                            <button className="border bg-slate-100 p-4 rounded-md">Student</button>
                            <span>or</span>
                            <button className="border bg-slate-100 p-4 rounded-md">Instructor</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
