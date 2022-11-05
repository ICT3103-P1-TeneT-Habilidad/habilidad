import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { classNames } from '../utils/Helpers'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
// import icons and assets
import { MdOutlineCancel } from 'react-icons/md'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import BigLogo from '../assets/habilidad_large_logo.png'

export default function NewNavbar() {
    const { getUserDetails, user_details, logout } = useAppContext()
    const [username, setUsername] = useState()

    useEffect(() => {
        getUserDetails()
    }, [])

    useEffect(() => {
        setUsername(user_details.username)
    }, [user_details])

    return (
        <Disclosure as="nav" className="bg-navbarfooter shadow">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link to="/">
                                        <img className="hidden lg:block h-24 w-auto" src={BigLogo} />
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        {!username ? (
                                            <Menu.Button>
                                                <div className="flex items-center uppercase text-black space-x-2">
                                                    <BsFillPersonFill />
                                                    <span>Login / Register</span>
                                                </div>
                                            </Menu.Button>
                                        ) : (
                                            <Menu.Button className="rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Open user menu</span>
                                                <span className='uppercase font-medium'>{username}</span>
                                            </Menu.Button>
                                        )}
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/profile">
                                                        <button
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Your Profile
                                                        </button>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/">
                                                        <button
                                                            onClick={() => {
                                                                logout()
                                                            }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Sign out
                                                        </button>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MdOutlineCancel className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">Tom Cook</div>
                                    <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Link to="/profile">
                                    <button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                        Your Profile
                                    </button>
                                </Link>
                                <Link to="/">
                                    <button
                                        onClick={() => {
                                            logout()
                                        }}
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
