import React from 'react'
import { Link } from 'react-router-dom'
import { copyrighted_msg, website_name, year } from '../utils/Constants'

const Footer = () => {
    return (
        <>
            <footer className="bg-background p-4 relative flex bottom-0 px-2 py-3 justify-between">
                <div className="flex justify-between px-4">
                    <div className="grid grid-cols-2 gap-5 mr-4 py-2 whitespace-nowrap uppercase">
                        <div>
                            <ul>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <Link to="/terms">Terms and Conditions</Link>
                                </li>
                                <li>
                                    <Link to="/privacy">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pr-10 uppercase font-medium">
                    <Link to="/">{website_name}</Link>
                </div>
            </footer>
            <div className="bg-background text-center font-mono">
                <span>
                    {copyrighted_msg} {year}
                </span>
            </div>
        </>
    )
}

export default Footer
