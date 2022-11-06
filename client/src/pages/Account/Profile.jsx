import { React, useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppContext } from '../../context/appContext'

const Profile = () => {
    const { getUserDetails, user_details, updateUserDetails, deactivateUser } = useAppContext()

    const [isDisabled, setIsDisabled] = useState(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            email: user_details?.email,
            phoneNumber: user_details?.phoneNumber,
            name: user_details?.name,
        },
    })

    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        reset(user_details)
        // eslint-disable-next-line
    }, [user_details])

    const password = useRef({})
    password.current = watch('password', '')

    const onSubmit = (data) => {
        delete data.role
        delete data.username
        updateUserDetails(data)
    }

    const onDeactivation = () => {
        deactivateUser()
        // navigate('/')
    }

    const ShowEditButton = () => {
        return (
            <div className="flex items-center justify-between">
                <div className="flex justify-ed p-4">
                    <button
                        id="edit-button"
                        className="shadow focus:shadow-outline focus:outline-none bg-navbarfooter font-bold py-2 px-4 rounded"
                        onClick={() => setIsDisabled(false)}
                    >
                        Edit
                    </button>
                </div>
                <div className="flex justify-ed p-4">
                    <button
                        id="deactivate-button"
                        className="shadow focus:shadow-outline focus:outline-none bg-accent1 font-bold py-2 px-4 rounded"
                        onClick={handleSubmit(onDeactivation)}
                    >
                        Deactivate Account
                    </button>
                </div>
            </div>
        )
    }

    const ShowProfileButtons = () => {
        return (
            <div className="flex items-center justify-between">
                <button
                    className="shadow focus:shadow-outline focus:outline-none bg-accent1 font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                        reset()
                        setIsDisabled(true)
                    }}
                >
                    Cancel
                </button>
                <button
                    className="shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                        reset()
                    }}
                >
                    Reset
                </button>
                <button
                    className="shadow focus:shadow-outline focus:outline-none bg-navbarfooter font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        )
    }

    const ShowPasswordBlock = () => {
        return (
            <>
                <div className="w-full p-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="w-full border border-slate-300 rounded-md p-2"
                        id="password"
                        type="password"
                        {...register('password', {
                            required: 'Please enter your password',
                            minLength: {
                                value: 8,
                                message: 'Password must have at least 8 characters',
                            },
                        })}
                    />
                    {errors.password ? <span className="text-sm text-red-500">{errors.password.message}</span> : null}
                </div>
                <div className="w-full p-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="confirmedPassword"
                    >
                        Re-enter Password
                    </label>
                    <input
                        className="w-full border border-slate-300 rounded-md p-2"
                        id="confirmedPassword"
                        type="password"
                        {...register('confirmedPassword', {
                            validate: (value) => value === password.current || 'The passwords do not match',
                            required: 'Please enter the password again',
                        })}
                    />
                    {errors.confirmedPassword ? (
                        <span className="text-sm text-red-500">{errors.confirmedPassword.message}</span>
                    ) : null}
                </div>
            </>
        )
    }

    return (
        // main div for background
        <div className="min-h-screen bg-background">
            <div className="flex items-center justify-center pt-10 flex-col">
                <h1 className="text-gray-800 font-semibold text-xl mt-5">{user_details.username}</h1>
                <h1 className="text-gray-500 text-sm">{user_details.role}</h1>
            </div>
            <div className="flex items-center justify-center">
                <div className="bg-white w-1/3 mt-10 rounded-lg">
                    {isDisabled ? <ShowEditButton /> : null}
                    <div className="flex auto-rows-auto auto-cols-auto grid-flow-row p-4">
                        {user_details && (
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 p-3 mb-6 md:mb-0">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            disabled={isDisabled}
                                            className="w-full border border-slate-300 rounded-md p-2"
                                            id="name"
                                            type="text"
                                            {...register('name', { required: 'Please enter your name' })}
                                        />
                                        {errors.name ? (
                                            <span className="text-sm text-red-500">{errors.name.message}</span>
                                        ) : null}
                                    </div>
                                    <div className="w-full md:w-1/2 p-3 mb-6 md:mb-0">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="phoneNumber"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            disabled={isDisabled}
                                            className="w-full border border-slate-300 rounded-md p-2"
                                            id="phoneNumber"
                                            type="tel"
                                            {...register('phoneNumber', { required: 'Please enter your phone number' })}
                                        />
                                        {errors.phoneNumber ? (
                                            <span className="text-sm text-red-500">{errors.phoneNumber.message}</span>
                                        ) : null}
                                    </div>
                                    <div className="w-full p-3 mb-6 md:mb-0">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="email"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            disabled={isDisabled}
                                            className="w-full border border-slate-300 rounded-md p-2"
                                            id="email"
                                            type="email"
                                            {...register('email', { required: 'Please enter your email address' })}
                                        />
                                        {errors.email ? (
                                            <span className="text-sm text-red-500">{errors.email.message}</span>
                                        ) : null}
                                    </div>
                                    {isDisabled ? null : <ShowPasswordBlock />}
                                </div>
                                {isDisabled ? null : <ShowProfileButtons />}
                            </form>
                        )}
                        {!user_details && (
                            <div>
                                <div className="text-center p-3">
                                    <span className="spinner-border spinner-border-lg align-center"></span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
