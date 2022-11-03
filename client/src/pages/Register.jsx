import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useAppContext } from '../context/appContext'
import { Alert } from '../components/index'

const Register = () => {
    const { createUser, showAlert } = useAppContext()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm()

    const password = useRef({})
    password.current = watch('password', '')

    const formatData = (data) => {
        delete data.re_pwd
    }

    const onSubmit = (data) => {
        console.log(data)
        formatData(data)
        createUser(data)
        reset()
    }

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for an account</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {showAlert && <Alert />}
                        <div className="mt-4 space-y-4">
                            <label>Select role:</label>
                            <div className="flex items-center">
                                <input
                                    id="student"
                                    name="student"
                                    type="radio"
                                    value="STUDENT"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    {...register('role')}
                                />
                                <label htmlFor="student" className="ml-3 block text-sm font-medium text-gray-700">
                                    Student
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="instructor"
                                    name="instructor"
                                    type="radio"
                                    value="INSTRUCTOR"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    {...register('role')}
                                />
                                <label htmlFor="instructor" className="ml-3 block text-sm font-medium text-gray-700">
                                    Instructor
                                </label>
                            </div>
                        </div>
                        <div>
                            <label>Username:</label>
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
                            <label>Name</label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    placeholder="Enter Name"
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    {...register('name', { required: 'Please enter your name' })}
                                />
                                {errors.name ? (
                                    <span className="text-sm text-red-500">{errors.name.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    {...register('email', {
                                        required: 'Please enter your email',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Entered value does not match email format',
                                        },
                                    })}
                                />
                                {errors.email ? (
                                    <span className="text-sm text-red-500">{errors.email.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <div className="mt-1">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    {...register('phoneNumber', {
                                        required: 'Please enter your phone number',
                                        maxLength: {
                                            value: 8,
                                            message: 'Maximum only 8 digits!',
                                        },
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.phoneNumber ? (
                                    <span className="text-sm text-red-500">{errors.phoneNumber.message}</span>
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
                                            value: 8,
                                            message: 'Password must have at least 8 characters',
                                        },
                                    })}
                                />
                                {errors.password ? (
                                    <span className="text-sm text-red-500">{errors.password.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label>Re-enter Password</label>
                            <div className="mt-1">
                                <input
                                    id="re_pwd"
                                    name="re_pwd"
                                    type="password"
                                    placeholder="Re-Enter Password"
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    {...register('re_pwd', {
                                        validate: (value) => value === password.current || 'The passwords do not match',
                                        required: 'Please enter the password again',
                                    })}
                                />
                                {errors.re_pwd ? (
                                    <span className="text-sm text-red-500">{errors.re_pwd.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-navbarfooter"
                            >
                                Register Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
