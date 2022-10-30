import { React, useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { languageOptions } from '../utils/Constants'
import { v4 as uuid } from 'uuid'

const CreateCourse = () => {
    const animatedComponents = makeAnimated()
    const [emptyUpload, setEmptyUpload] = useState(true)
    const [materialInfo, setMaterialInfo] = useState({})
    const [keysList, setKeysList] = useState([])
    const [materialComponents, setMaterialComponents] = useState({})
    const topicOptions = languageOptions // get list from get all topics API

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        mode: 'onBlur',
    })

    const currentKeyList = useRef({})
    currentKeyList.current = keysList

    const currentMaterialComponents = useRef({})
    currentMaterialComponents.current = materialComponents

    const currentMaterialInfo = useRef({})
    currentMaterialInfo.current = materialInfo

    useEffect(() => {
        checkEmptyUpload()
    })

    const NewCourseMaterial = ({ keyId }) => {
        return (
            <>
                <div className="flex flex-row w-full">
                    <div className="w-10/12 p-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for={keyId}
                        >
                            Material Title
                        </label>
                        <Controller
                            name={keyId}
                            control={control}
                            rules={{
                                required: 'Please enter the title of the video',
                            }}
                            render={({ field }) => {
                                return (
                                    <input
                                        {...field}
                                        className="w-full border border-slate-300 rounded-md p-2"
                                        id="materialTitle"
                                        type="text"
                                        onBlur={(e) => {
                                            titleChangeHandler(e.target.value, keyId)
                                        }}
                                    />
                                )
                            }}
                        />
                        {errors[keyId] ? <span className="text-sm text-red-500">{errors[keyId].message}</span> : null}
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-10/12 p-3">
                        <label className="w-full border border-slate-300 rounded-md p-2 text-center">
                            {currentMaterialInfo.current[keyId]['file']
                                ? currentMaterialInfo.current[keyId]['file'].name
                                : 'Choose a file to upload'}
                            <input
                                type="file"
                                onChange={(e) => {
                                    fileHandler(e.target.files[0], keyId)
                                }}
                                hidden
                            />
                        </label>
                    </div>
                    <div className="flex flex-col p-3">
                        <button
                            className="shadow focus:shadow-outline focus:outline-none bg-accent1 font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => removeComponent(keyId)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <hr />
            </>
        )
    }

    const checkEmptyUpload = () => {
        setEmptyUpload(false)
        Object.values(currentMaterialInfo.current).forEach((element) => {
            if (element['file'] === null || element['title'] === null || element['title'] === '') {
                setEmptyUpload(true)
            }
        })
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    const addComponent = () => {
        const keyId = uuid()
        setKeysList([...keysList, keyId])
        setMaterialInfo({ ...materialInfo, [keyId]: { title: null, file: null, order: null } })
        setMaterialComponents({
            ...materialComponents,
            [keyId]: <NewCourseMaterial keyId={keyId} />,
        })
        setEmptyUpload(true)
    }

    const removeComponent = (keyId) => {
        setMaterialComponents((current) => {
            const copy = { ...current }
            delete copy[keyId]
            return copy
        })
        setMaterialInfo((current) => {
            const copy = { ...current }
            delete copy[keyId]
            return copy
        })
        setKeysList(keysList.filter((index) => index !== keyId))
        checkEmptyUpload()
    }

    const fileHandler = (file, keyId) => {
        const changed = currentMaterialInfo.current[keyId]
        changed['file'] = file
        setMaterialInfo({ ...currentMaterialInfo.current, [keyId]: changed })
        setEmptyUpload(false)
        setMaterialComponents({
            ...currentMaterialComponents.current,
            [keyId]: <NewCourseMaterial keyId={keyId} />,
        })
    }

    const titleChangeHandler = (title, keyId) => {
        const changed = currentMaterialInfo.current[keyId]
        changed['title'] = title
        setMaterialInfo({ ...currentMaterialInfo.current, [keyId]: changed })
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
                                        {...register('duration', {
                                            required: 'Please enter how long it will take to complete the course',
                                        })}
                                    />
                                    {errors.duration ? (
                                        <span className="text-sm text-red-500">{errors.duration.message}</span>
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
                            </div>
                        </div>
                        {/* topics row */}
                        <div className="flex flex-row">
                            <div className="p-3 w-full">
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
                                {errors.topicCourse ? (
                                    <span className="text-sm text-red-500">{errors.topicCourse.message}</span>
                                ) : null}
                            </div>
                        </div>
                        {/* description row */}
                        <div className="flex flex-row">
                            <div className="p-3 w-full">
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
                        <hr className="p-3" />
                        {/* course materials section */}
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row p-3">
                                <h3 className="text-xl font-extrabold text-gray-900">Upload Course Material</h3>
                            </div>
                            {keysList.length === 0
                                ? addComponent()
                                : keysList.map((keyId) => <div id={keyId}>{materialComponents[keyId]}</div>)}
                            <div className="flex flex-row p-3">
                                {!emptyUpload ? (
                                    <button
                                        className="shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded"
                                        type="button"
                                        onClick={() => addComponent()}
                                    >
                                        Add Material
                                    </button>
                                ) : null}
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

export default CreateCourse
