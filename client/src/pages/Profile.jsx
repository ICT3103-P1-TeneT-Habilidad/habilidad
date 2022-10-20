import { React, useState } from 'react'
import AnonProfile from '../assets/anon-profile.svg'

const Profile = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [hasChanged, setHasChanged] = useState(null)

    const ButtonClick = () => {
        setIsDisabled(!isDisabled)
        setHasChanged(null)
    };

    const PasswordChanged = Event => {
        const inputText = Event.target.value
        if (inputText.trim().length !== 0){
            setHasChanged(true)
        } else{
            setHasChanged(null)
        }
    }

    const ShowPasswordBlock = () => {
        return (
            <div id="confirm-password">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-password">
                    Confirm Password
                </label>
                <input className="profile-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-confirm-password" type="password" placeholder="******************" />
            </div>
        )
    }

    const ShowProfileButtons = () => {
        return (
            <div className="flex items-center justify-between" id="profile-buttons">
                <button className="shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded" onClick={ButtonClick} type="reset">
                    Cancel
                </button>
                <button className="shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded" type="reset">
                    Reset
                </button>
                <button className="shadow focus:shadow-outline focus:outline-none bg-accent1 font-bold py-2 px-4 rounded" type="submit">
                    Submit
                </button>
            </div>
        )
    }

    const ShowEditButton = () => {
        return (
            <div className="flex justify-ed p-4">
                <button id="edit-button" className="shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded" onClick={ButtonClick}>Edit</button>
            </div>
        )
    }

    return (
        // main div for background
        <div className="min-h-screen bg-background">
            <div className="flex items-center justify-center">
                <div className="bg-white w-1/3 mt-10 rounded-lg">
                    <div className="flex items-center justify-center pt-10 flex-col">
                        <img src={AnonProfile} alt="Profile" className="rounded-full w-32" />
                        <h1 className="text-gray-800 font-semibold text-xl mt-5">NAME</h1>
                        <h1 className="text-gray-500 text-sm">ROLE</h1>
                    </div>
                    {isDisabled ? <ShowEditButton /> : null}
                    <div className="flex auto-rows-auto auto-cols-auto grid-flow-row p-4">
                        <form className="w-full max-w-lg">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                                        Name
                                    </label>
                                    <input disabled={isDisabled} className="profile-input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="gridt-name" type="text" placeholder="Jane" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-PhoneNo">
                                        Phone Number
                                    </label>
                                    <input disabled={isDisabled} className="profile-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="Phone Number" placeholder="98765432" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                                        Email
                                    </label>
                                    <input disabled={isDisabled} className="profile-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="janedoe@email.com" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Password
                                    </label>
                                    <input disabled={isDisabled} onChange={PasswordChanged} className="profile-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                                    {hasChanged ? <ShowPasswordBlock /> : null}
                                </div>
                            </div>
                            {isDisabled ? null : <ShowProfileButtons />}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile