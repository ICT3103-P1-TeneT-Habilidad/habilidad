import { Disclosure, Menu } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { NavbarModal } from './index'
// import icons and assets
import { BsFillPersonFill } from 'react-icons/bs'
import BigLogo from '../assets/habilidad_large_logo.png'

export default function NewNavbar() {
    const { showModal, openModal } = useAppContext()

    return (
        <>
            <Disclosure as="nav" className="bg-navbarfooter shadow">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link to="/">
                                            <img className="hidden lg:block h-24 w-auto" src={BigLogo} alt="biglogo" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button>
                                                <div className="flex text-sm font-bold leading-relaxed mr-4 py-2 uppercase text-black items-center">
                                                    <BsFillPersonFill />
                                                    <button type="button" className="ml-2" onClick={() => showModal()}>
                                                        LOGIN/REGISTER
                                                    </button>
                                                </div>
                                            </Menu.Button>
                                        </div>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>
            {openModal && <NavbarModal />}
        </>
    )
}
