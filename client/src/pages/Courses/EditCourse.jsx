import { React, useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { languageOptions } from '../../utils/Constants'
import { useAppContext } from '../../context/appContext'
import { formatTopicOption, sortCourseMaterials } from '../../utils/Helpers'
import imagePlaceholder from '../../assets/noimage.jpg'
import { useParams } from 'react-router-dom'

const EditCourse = () => {
    const { getAllTopics, topics, getCourseDetail, courseDetail } = useAppContext()
    const animatedComponents = makeAnimated()
    const { courseId } = useParams()

    useEffect(() => {
        getCourseDetail(courseId)
        getAllTopics()
    }, [])

    const [coverImagePreview, setCoverImagePreview] = useState(imagePlaceholder)
    const [materialVideoPreview, setMaterialVideoPreview] = useState({})
    const currentMaterialVideoPreview = useRef({})
    currentMaterialVideoPreview.current = materialVideoPreview

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

    const getOriginalTopics = () => {
        const temp = courseDetail?.topicCourse?.map((element) => ({
            value: element.topicId,
            label: element.topics?.topicName,
        }))
        return temp
    }

    const loadCourseMaterials = () => {
        const sorted = sortCourseMaterials(courseDetail?.courseMaterial)
        setKeysList(sorted.map((material) => material.courseMaterialId))
        sorted.forEach((material) => {
            const tempMaterialInfo = currentMaterialInfo.current
            tempMaterialInfo[material.courseMaterialId] = {
                title: material.title,
                file: material.url,
                order: material.order,
            }
            setMaterialInfo(tempMaterialInfo)

            const tempMaterialVideoPreview = currentMaterialVideoPreview.current
            tempMaterialVideoPreview[material.courseMaterialId] = material.url
            setMaterialVideoPreview(tempMaterialVideoPreview)

            const tempMaterialComponent = currentMaterialComponents.current
            tempMaterialComponent[material.courseMaterialId] = <NewCourseMaterial keyId={material.courseMaterialId} />
            setMaterialComponents(tempMaterialComponent)
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            courseName: courseDetail?.courseName,
            duration: courseDetail?.duration,
            price: courseDetail?.price,
            courseDescription: courseDetail?.description,
            image: courseDetail?.imageUrl,
            topicCourse: getOriginalTopics(),
            language: {},
        },
    })

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
        console.log(data)

        const formData = new FormData()
        for (const key in data) {
            if (key === 'materials') {
                const material = []
                for (const i in data[key]) {
                    if (typeof data[key][i].file === 'object') {
                        formData.append('materialFiles', data[key][i].file)
                    } else {
                        formData.append('materialFiles', null)
                    }
                    material.push({
                        courseMaterialId: i,
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
    }

    const fileHandler = (file, keyId) => {
        const changed = currentMaterialInfo.current[keyId]
        changed['file'] = file
        setMaterialInfo({ ...currentMaterialInfo.current, [keyId]: changed })

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

    const NewCourseMaterial = ({ keyId }) => {
        return (
            <>
                <div className="flex flex-row w-full p-3">
                    <div className="flex flex-col w-1/2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Current video
                            <p>(New videos will not be reflected here)</p>
                        </label>
                        <video width="320" height="240" controls>
                            <source src={materialInfo[keyId].file} />
                        </video>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex flex-row w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                                for={keyId}
                            >
                                Lesson {materialInfo[keyId].order}
                            </label>
                        </div>
                        <div className="flex flex-row w-full p-3">
                            <Controller
                                name={keyId}
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <input
                                            {...field}
                                            placeholder={materialInfo[keyId].title}
                                            className="w-full border border-slate-300 rounded-md p-2"
                                            id="materialTitle"
                                            type="text"
                                            value={materialInfo[keyId].title}
                                            onChange={(e) => {
                                                titleChangeHandler(e.target.value, keyId)
                                            }}
                                        />
                                    )
                                }}
                            />
                            {errors[keyId] ? (
                                <span className="text-sm text-red-500">{errors[keyId].message}</span>
                            ) : null}
                        </div>
                        <div className="flex flex-row w-full p-3">
                            <label className="w-full border border-slate-300 rounded-md p-2 text-center">
                                {materialInfo[keyId].file.name
                                    ? materialInfo[keyId].file.name
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
                </div>
                <hr />
            </>
        )
    }

    useEffect(() => {
        setCoverImagePreview(courseDetail?.imageUrl)
        loadCourseMaterials()
        reset({
            courseName: courseDetail?.courseName,
            duration: courseDetail?.duration,
            price: courseDetail?.price,
            courseDescription: courseDetail?.description,
            image: courseDetail?.imageUrl,
            topicCourse: getOriginalTopics(),
            language: {
                value: courseDetail?.language,
                label: courseDetail?.language.charAt(0) + courseDetail?.language.slice(1).toLowerCase(),
            },
        })
    }, [courseDetail])

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
                                                    options={formatTopicOption(topics)}
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
                                <div className="p-3">
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
                                        step="any"
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
                            {keysList.map((keyId) => (
                                <div key={keyId}>{materialComponents[keyId]}</div>
                            ))}
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
