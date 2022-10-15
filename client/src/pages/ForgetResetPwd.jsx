import React from 'react'
import { useForm } from 'react-hook-form'

const ForgetResetPwd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div>
            <div className="p-24 space-y-5">
                <div>
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">Forget Password</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Use the username that you created with Habilidad
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                            Username
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="max-w-lg block w-full shadow-sm bg-navbarfooter sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                {...register('username', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetResetPwd
