import React from 'react'
import { useForm } from 'react-hook-form'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for an account</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Username</label>
                            <div classname="mt-1">
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
                            <div classname="mt-1">
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
                            <div classname="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    {...register('email', { required: 'Please enter your email' })}
                                />
                                {errors.email ? (
                                    <span className="text-sm text-red-500">{errors.email.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <div classname="mt-1">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    {...register('phone_number', {
                                        required: 'Please enter your phone number',
                                        maxLength: {
                                            value: 8,
                                            message: 'Maximum only 8 digits!',
                                        },
                                    })}
                                />{' '}
                                {errors.phone_number ? (
                                    <span className="text-sm text-red-500">{errors.phone_number.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label>Password</label>
                            <div classname="mt-1">
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
                                />{' '}
                                {errors.password ? (
                                    <span className="text-sm text-red-500">{errors.password.message}</span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label>Re-enter Password</label>
                            <div classname="mt-1">
                                <input
                                    id="re_pwd"
                                    name="re_pwd"
                                    type="password"
                                    placeholder="Re-Enter Password"
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    {...register('re_pwd', {
                                        required: 'Please enter your password again',
                                        minLength: {
                                            value: 6,
                                            message: 'Need to be more than 6 characters!',
                                        },
                                    })}
                                />{' '}
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
