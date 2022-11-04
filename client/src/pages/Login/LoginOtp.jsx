import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

const LoginOtp = () => {
    const { login, user } = useAppContext()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        login(data)
    }
    
    useEffect(() => {
        if (user) navigate('/')
    }, [user, navigate])

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 mb-4">OTP</h2>
                <span className="text-center text-gray-500 text-sm">
                    Enter the OTP code sent to your email registered with your account
                </span>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                OTP
                            </label>
                            <div className="mt-1">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register('token', {
                                        required: 'Please enter your OTP',
                                        maxLength: {
                                            value: 6,
                                            message: 'Please enter only 6 characters',
                                        },
                                    })}
                                />
                                {errors.token ? (
                                    <span className="text-sm text-red-500">{errors.email.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-navbarfooter"
                            >
                                Submit OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginOtp
