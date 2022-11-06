import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { useForm } from 'react-hook-form'
import { Alert, LoadingMsg } from '../../components'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const { showAlert, sendLoginOtp, loginOtp, isLoading, openModal } = useAppContext()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // console.log(data)
        sendLoginOtp(data)
    }

    useEffect(() => {
        if (loginOtp) navigate('/otp')
    }, [loginOtp, navigate])

    useEffect(() => {
        showLoadingMsg()
    }, [isLoading])

    const showLoadingMsg = () => {
        return <LoadingMsg />
    }

    return (
        <>
            <div
                className={`min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${openModal ? 'opacity-40' : ""}`}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to HABILIDAD</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {/* {user_type === 'Instructor' ? <InstructorLogin /> : <StudentLogin />} */}
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {showAlert ? <Alert /> : isLoading && showLoadingMsg()}
                            <div>
                                <label>Username</label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        placeholder="Enter Username"
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        {...register('username', { required: 'Please enter your username' })}
                                    />
                                    {errors.username ? (
                                        <span className="text-sm text-red-500">{errors.username.message}</span>
                                    ) : null}
                                </div>
                            </div>
                            <div>
                                <label>Password</label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        {...register('password', {
                                            required: 'Please enter your password',
                                            minLength: {
                                                value: 6,
                                                message: 'Need to be more than 6 characters!',
                                            },
                                        })}
                                    />
                                    {errors.password ? (
                                        <span className="text-sm text-red-500">{errors.password.message}</span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="pb-2">
                                <Link to="/forgetpwd">
                                    <span className="text-xs underline text-blue-500 italic float-right">
                                        Forget Password
                                    </span>
                                </Link>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-navbarfooter"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
