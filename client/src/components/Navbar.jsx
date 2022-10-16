import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { website_name } from '../utils/Constants'
import { useAppContext } from '../context/appContext'
import { LoginModal } from '../components/index'
// import icons
import { AiOutlineMenu } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'

export default function Navbar({ fixed }) {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const { showModal, openModal } = useAppContext()

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-navbarfooter">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            to="/"
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black"
                        >
                            {website_name}
                        </Link>
                        <button
                            className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <AiOutlineMenu />
                        </button>
                    </div>
                    <div
                        className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <div className="flex text-sm font-bold leading-relaxed mr-4 py-2 uppercase text-black items-center">
                                    <BsFillPersonFill />
                                    <button type="button" className="ml-2" onClick={() => showModal()}>
                                        LOGIN/REGISTER
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {openModal && <LoginModal />}
        </>
    )
}
