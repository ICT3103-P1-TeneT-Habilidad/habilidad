import { React, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { languageOptions } from '../utils/Constants'
import { v4 as uuid } from 'uuid'
import imagePlaceholder from '../assets/noimage.jpg'
import { useAppContext } from '../context/appContext'

const EditCourse = () => {
    const { getAllTopics, topics } = useAppContext()

    const animatedComponents = makeAnimated()

    const courseData = {
        courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
        courseName: 'dumb',
        imageUrl: 'https://res.cloudinary.com/drznyznmo/image/upload/v1667308005/xhgr8cefstr8t0uu8nn0.jpg',
        duration: 10000,
        price: 10.99,
        description: 'test_course_1_des',
        language: 'ENGLISH',
        courseMaterial: [
            { title: 'Basics of React', url: 'https://www.youtube.com/embed/LRVVvmYg9Ls', order: 2 },
            {
                title: 'Death 1 to React',
                url: 'https://www.youtube.com/embed/HE74FKFZrtI',
                order: 1,
            },
            {
                title: 'Death 2 to React',
                url: 'https://res.cloudinary.com/drznyznmo/video/upload/v1667394035/video_2022-11-02_20-58-06_ae87rs.mp4',
                order: 4,
            },
            {
                title: 'Death 3 to React',
                url: 'https://www.youtube.com/embed/sSsMsSrXWl4',
                order: 3,
            },
        ],
        topicCourse: [
            {
                topicCourseId: '017855b1-58f4-4efd-b1ab-ce74857745a8',
                courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
                topicId: '791ecc1c-4729-4838-b4bc-81cdf4ba10f3',
                topic: {
                    topicName: 'REEEEEEEEEEEE',
                    //whatever other info
                },
            },
        ],
    }

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        mode: 'onBlur',
    })

    useEffect(() => {
        getAllTopics()
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Create a new Course!</h2>
            </div>
            <div className="flex bg-white mt-10 rounded-lg w-full justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex p-4 w-3/4">
                    <div className="flex flex-col w-full">
                        {/* general info row */}
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
                                        value={courseData.courseName}
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
                                        for="duration"
                                    >
                                        Course Duration (in hours)
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="duration"
                                        type="number"
                                        value={courseData.duration}
                                        {...register('duration', {
                                            required: 'Please enter how long it will take to complete the course',
                                        })}
                                    />
                                    {errors.duration ? (
                                        <span className="text-sm text-red-500">{errors.duration.message}</span>
                                    ) : null}
                                </div>
                                <div className="p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="topicCourse"
                                    >
                                        Relevant Topics
                                    </label>
                                    <Controller
                                        name="topicCourse"
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
                                                    options={() => {
                                                        const topicOptions = topics.data.map((d) => ({
                                                            value: d.topicId,
                                                            label: d.topicName,
                                                        }))
                                                    }}
                                                    isSearchable={true}
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    placeholder="Select a topic"
                                                    className="w-full"
                                                />
                                            )
                                        }}
                                    />
                                    {errors.topicCourse ? (
                                        <span className="text-sm text-red-500">{errors.topicCourse.message}</span>
                                    ) : null}
                                </div>
                                <div className="flex flex-col p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="courseDescription"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="courseDescription"
                                        {...register('courseDescription', {
                                            required: 'Please enter a short description of the course',
                                        })}
                                    />
                                    {errors.courseDescription ? (
                                        <span className="text-sm text-red-500">{errors.courseDescription.message}</span>
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
                                        for="price"
                                    >
                                        Course Price (in SGD)
                                    </label>
                                    <input
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="price"
                                        type="number"
                                        {...register('price', {
                                            required: 'Please enter how long it will take to complete the course',
                                        })}
                                    />
                                    {errors.price ? (
                                        <span className="text-sm text-red-500">{errors.price.message}</span>
                                    ) : null}
                                </div>
                                <div className="p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="image"
                                    >
                                        Cover Image
                                    </label>
                                    <div className="flex flex-row">
                                        <div className="flex flex-col p-3">
                                            <input
                                                id="image"
                                                type="file"
                                                className="w-full"
                                                accept="image/png, image/jpg, image/jpeg"
                                                {...register('image', {
                                                    required: 'Please upload a cover image for the course',
                                                    onChange: (e) => console.log(e.target.files[0]),
                                                })}
                                            />
                                            {errors.image ? (
                                                <span className="text-sm text-red-500">{errors.image.message}</span>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col w-1/3 h-1/3">
                                            <img
                                                src={imagePlaceholder}
                                                alt="cover for course"
                                                className="w-auto h-auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="p-3" />
                        {/* course materials section */}
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row p-3">
                                <h3 className="text-xl font-extrabold text-gray-900">Upload Course Material</h3>
                            </div>
                        </div>
                        {/* button row */}
                        <div className="flex flex-row pt-5">
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

export default EditCourse
