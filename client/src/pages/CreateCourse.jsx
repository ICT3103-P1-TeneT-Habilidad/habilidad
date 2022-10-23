import { React } from 'react'
import { useForm } from 'react-hook-form'
import { languageOptions } from '../utils/Constants'

const CreateCourse = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const topicOptions = null // get list from get all topics API

    const onSubmit = (data) => {
        console.log(data)
    }

    const getLanguageList = () => {
        return languageOptions.map((language) => {
            return <option value={language.value}>{language.label}</option>
        })
    }

    const getTopicsList = () => {
        return topicOptions.map((topic) => {
            return <option value={topic.value}>{topic.label}</option> // to be changed
        })
    }

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new Course!</h2>
            </div>
            <div className="flex items-center justify-center">
                <div className="bg-white mt-10 rounded-lg">
                    <div className="flex auto-rows-auto auto-cols-auto grid-flow-row p-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="-wfull max-w-lg">
                            <div className="flex flex-wrap mb-6">
                                <div className="w-full p-3 mb-6 md:mb-0">
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
                                <div className="w-full p-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="language"
                                    >
                                        Language
                                    </label>
                                    <select
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="language"
                                        {...register('language', {
                                            required: 'Please select the language the course is taught in',
                                        })}
                                    >
                                        {getLanguageList()}
                                    </select>
                                    {errors.language ? (
                                        <span className="text-sm text-red-500">{errors.language.message}</span>
                                    ) : null}
                                </div>
                                <div className="w-full p-3 mb-6 md:mb-0">
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
                                <div className="w-full p-3 mb-6 md:mb-0">
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
                                <div className="w-full p-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="topics"
                                    >
                                        Relevant Topics
                                    </label>
                                    <select
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="topics"
                                        multiple
                                        {...register('topics', {
                                            required: 'Please select at least one relevant topic',
                                        })}
                                    >
                                        {getLanguageList()}
                                    </select>
                                    {errors.topics ? (
                                        <span className="text-sm text-red-500">{errors.topics.message}</span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="shadow focus:shadow-outline focus:outline-none bg-navbarfooter font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCourse
