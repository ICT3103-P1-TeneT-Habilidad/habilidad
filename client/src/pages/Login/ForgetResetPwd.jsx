import React from 'react'
import { useForm } from 'react-hook-form'
import { useAppContext } from '../../context/appContext'
import { Alert } from '../../components'

const ForgetResetPwd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { showAlert, sendPasswordResetLink, openModal } = useAppContext()

    const onSubmit = (data) => {
        console.log(data)
        sendPasswordResetLink(data.email)
    }

    return (
        <div
            className={`min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${
                openModal ? 'opacity-40' : ''
            }`}
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 mb-4">Forget Password</h2>
                <span className="text-center text-gray-500 text-sm">
                    Enter your email address to reset your password.
                </span>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="mb-5 text-sm">{showAlert && <Alert />}</div>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register('email', {
                                        required: 'Please enter your email',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        },
                                    })}
                                />
                                {errors.email ? (
                                    <span className="text-sm text-red-500">{errors.email.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-navbarfooter"
                            >
                                Submit to receive email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetResetPwd
