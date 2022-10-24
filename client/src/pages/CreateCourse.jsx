import { React } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { languageOptions } from '../utils/Constants'

const CreateCourse = () => {
    const animatedComponents = makeAnimated()

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        mode: 'onBlur',
    })

    const topicOptions = languageOptions // get list from get all topics API

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new Course!</h2>
            </div>
            <div className="flex bg-white mt-10 rounded-lg w-full justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex p-4 w-3/4">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full">
                            <div className="flex flex-col w-1/2">
                                <div className="p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="courseName"
                                    >
                                        Course Name
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="courseName"
                                        type="text"
                                        {...register('courseName', {
                                            required: 'Please enter the name of the course',
                                        })}
                                    />
                                    {errors.courseName ? (
                                        <span className="text-sm text-red-500">{errors.courseName.message}</span>
                                    ) : null}
                                </div>
                                <div className="p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="courseDuration"
                                    >
                                        Course Duration (in hours)
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="courseDuration"
                                        type="number"
                                        {...register('courseDuration', {
                                            required: 'Please enter how long it will take to complete the course',
                                        })}
                                    />
                                    {errors.courseDuration ? (
                                        <span className="text-sm text-red-500">{errors.courseDuration.message}</span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <div className="p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="language"
                                    >
                                        Language
                                    </label>
                                    <Controller
                                        name="language"
                                        control={control}
                                        rules={{
                                            required: 'Please select the language the course is taught in',
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    {...field}
                                                    isClearable={true}
                                                    options={languageOptions}
                                                    isSearchable={true}
                                                    placeholder="Select a language"
                                                    className="w-full"
                                                />
                                            )
                                        }}
                                    />
                                    {errors.language ? (
                                        <span className="text-sm text-red-500">{errors.language.message}</span>
                                    ) : null}
                                </div>
                                <div className="p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="coursePrice"
                                    >
                                        Course Price (in SGD)
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="coursePrice"
                                        type="number"
                                        {...register('coursePrice', {
                                            required: 'Please enter how long it will take to complete the course',
                                        })}
                                    />
                                    {errors.coursePrice ? (
                                        <span className="text-sm text-red-500">{errors.coursePrice.message}</span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        {/* topics row */}
                        <div className="flex flex-row">
                            <div className="p-3 w-full">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="topics"
                                >
                                    Relevant Topics
                                </label>
                                <Controller
                                    name="topics"
                                    control={control}
                                    rules={{
                                        required: 'Please select up to 5 topics relevant to this course',
                                        validate: (value) => 
                                            value.length <= 5 || 'Please only select 5 relevant topics',
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                {...field}
                                                isClearable={true}
                                                isMulti
                                                options={topicOptions}
                                                isSearchable={true}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                placeholder="Select a topic"
                                                className="w-full"
                                            />
                                        )
                                    }}
                                />
                                {errors.topics ? (
                                    <span className="text-sm text-red-500">{errors.topics.message}</span>
                                ) : null}
                            </div>
                        </div>
                        {/* description row */}
                        <div className="flex flex-row">
                            <div className="p-3 w-full">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="courseDesc"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="w-full border border-slate-300 rounded-md p-2"
                                    id="courseDesc"
                                    {...register('courseDesc', {
                                        required: 'Please enter a short description of the course',
                                    })}
                                />
                                {errors.courseDesc ? (
                                    <span className="text-sm text-red-500">{errors.courseDesc.message}</span>
                                ) : null}
                            </div>
                        </div>
                        {/* course materials section */}
                        <div className="flex flex-row">
                            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                                <h3 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                                    Upload Course Material
                                </h3>
                            </div>
                        </div>
                        {/* button row */}
                        <div className="flex flex-row">
                            <div className="flex items-center justify-between">
                                <button
                                    className="shadow focus:shadow-outline focus:outline-none bg-navbarfooter font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse
