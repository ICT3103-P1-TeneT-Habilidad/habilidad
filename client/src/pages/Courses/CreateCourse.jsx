import React, { useEffect, useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { languageOptions } from '../../utils/Constants'
import imagePlaceholder from '../../assets/noimage.jpg'
import { useAppContext } from '../../context/appContext'

const CreateCourse = () => {
    const { createNewCourse, getAllTopics, topics } = useAppContext()

    const animatedComponents = makeAnimated()
    const [emptyUpload, setEmptyUpload] = useState(true)

    const [coverImagePreview, setCoverImagePreview] = useState(imagePlaceholder)

    const [coverImageFile, setCoverImageFile] = useState()
    const currentCoverImage = useRef({})
    currentCoverImage.current = coverImageFile

    const [materialInfo, setMaterialInfo] = useState({})
    const currentMaterialInfo = useRef({})
    currentMaterialInfo.current = materialInfo

    const [keysList, setKeysList] = useState([])
    const currentKeyList = useRef({})
    currentKeyList.current = keysList

    const [materialComponents, setMaterialComponents] = useState({})
    const currentMaterialComponents = useRef({})
    currentMaterialComponents.current = materialComponents

    const [topicOptions, setTopicOptions] = useState([])

    useEffect(() => {
        getAllTopics()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setTopicOptions(
            topics?.map((topic) => ({
                label: topic.topicName,
                value: topic.topicId,
            }))
        )
    }, [topics])

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
        checkEmptyUpload()
        // console.log(materialInfo)
    })

    const NewCourseMaterial = ({ keyId }) => {
        return (
            <>
                <div className="flex flex-row w-full">
                    <div className="w-10/12 p-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                            htmlFor={keyId}
                        >
                            Lesson {currentKeyList.current.length}
                        </label>
                        <Controller
                            name={keyId}
                            control={control}
                            rules={{
                                required: 'Please enter the title of the Video',
                            }}
                            render={({ field }) => {
                                return (
                                    <input
                                        {...field}
                                        placeholder="Title of lesson, e.g. Lesson 1: Basics of React"
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
                                accept="video/*"
                                onChange={(e) => {
                                    fileHandler(e.target.files[0], keyId)
                                }}
                                hidden
                            />
                        </label>
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

    const dataCleanUp = (data) => {
        data.materials = currentMaterialInfo.current
        data.image = currentCoverImage.current
        data.language = data.language['value']

        // // remove keys
        currentKeyList.current.map((key) => delete data[key])

        return data
    }

    const onSubmit = (data) => {
        data = dataCleanUp(data)

        const formData = new FormData()
        for (const key in data) {
            if (key === 'materials') {
                const material = []
                for (const i in data[key]) {
                    formData.append('materialFiles', data[key][i].file)
                    material.push({
                        title: data[key][i].title,
                        order: data[key][i].order,
                    })
                }
                formData.append(key, JSON.stringify(material))
            } else if (key === 'topicCourse') {
                formData.append(key, JSON.stringify(data[key]))
            } else {
                formData.append(key, data[key])
            }
        }

        createNewCourse(formData)
    }

    const addComponent = () => {
        const keyId = uuid()
        setKeysList([...keysList, keyId])
        setMaterialInfo({
            ...materialInfo,
            [keyId]: { title: null, file: null, order: currentKeyList.current.length + 1 },
        })
        setMaterialComponents({
            ...materialComponents,
            [keyId]: <NewCourseMaterial keyId={keyId} />,
        })
        setEmptyUpload(true)
    }

    const removeComponent = () => {
        const keyId = currentKeyList.current.at(-1)
        unregister(keyId)
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

    const coverImageFileHandler = (file) => {
        setCoverImageFile(file)
        let reader = new FileReader()
        reader.onload = (e) => {
            setCoverImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
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
                                        htmlFor="courseName"
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
                                        htmlFor="duration"
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
                                <div className="p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="topicCourse"
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
                                <div className="flex flex-col p-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="courseDescription"
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
                                        htmlFor="language"
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
                                        htmlFor="price"
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
                                        htmlFor="image"
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
                                                    onChange: (e) => coverImageFileHandler(e.target.files[0]),
                                                })}
                                            />
                                            {errors.image ? (
                                                <span className="text-sm text-red-500">{errors.image.message}</span>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col w-1/3 h-1/3">
                                            <img
                                                src={coverImagePreview}
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
                            {keysList.length === 0
                                ? addComponent()
                                : keysList.map((keyId) => <div id={keyId}>{materialComponents[keyId]}</div>)}
                            <div className="flex flex-row">
                                {!emptyUpload ? (
                                    <div className="flex flex-col p-3">
                                        <button
                                            className="shadow focus:shadow-outline focus:outline-none bg-accent2 font-bold py-2 px-4 rounded"
                                            type="button"
                                            onClick={() => addComponent()}
                                        >
                                            Add Material
                                        </button>
                                    </div>
                                ) : null}

                                {currentKeyList.current.length > 1 ? (
                                    <div className="flex flex-col p-3">
                                        <button
                                            className="shadow focus:shadow-outline focus:outline-none bg-accent1 font-bold py-2 px-4 rounded"
                                            type="button"
                                            onClick={() => removeComponent()}
                                        >
                                            Remove Last Material Added
                                        </button>
                                    </div>
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
