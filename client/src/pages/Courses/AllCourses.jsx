import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext.jsx'
import { CourseCard } from '../../components/index.jsx'
import Select from 'react-select'
import { filterOptions } from '../../utils/Constants.jsx'
import { useForm, Controller } from 'react-hook-form'

const AllCourses = () => {
    const { getAllCourses, courses } = useAppContext()

    useEffect(() => {
        getAllCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { handleSubmit, control } = useForm()

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                <div>
                    <h3 className="font-semibold text-2xl p-4">All Courses</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full">
                        <div className="flex flex-row space-x-5">
                            <Controller
                                name="filter"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        isClearable
                                        {...field}
                                        options={filterOptions}
                                        isSearchable={true}
                                        placeholder={'Sort By'}
                                        isMulti={false}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                )}
                            />
                            <button
                                type="submit"
                                className="shadow-sm block px-5 border-gray-300 rounded-md bg-slate-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div>{courses && <CourseCard data={courses} />}</div>
            </div>
        </div>
    )
}

export default AllCourses
