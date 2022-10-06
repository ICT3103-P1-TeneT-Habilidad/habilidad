import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'

const Navbar = () => {
    return (
        <div className="tw-bg-background">
            <section className="tw-flow-root tw-px-6 tw-pt-3 tw-mx-32 tw-mt-2">
                <div className="tw-float-left">
                    <div>LOGO HERE</div>
                </div>
                <div className="tw-float-right">
                    <BsFillPersonFill />
                </div>
            </section>
            {/* <div className="tw-px-6 tw-mx-32 tw-mt-2">
            </div> */}
        </div>
    )
}

export default Navbar
