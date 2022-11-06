import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { BigTable } from '../../components'
import { Link } from 'react-router-dom'

const InstructorCourseList = () => {
    const { created_courses, getCreatedCoursesByInstructor } = useAppContext()

    useEffect(() => {
        getCreatedCoursesByInstructor()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(created_courses)
    }, [created_courses])

    const columns = [
        {
            Header: 'Course Name',
            accessor: 'courseName',
        },
        {
            Header: 'Language',
            accessor: 'language',
        },
        {
            Header: 'Duration',
            accessor: 'duration',
        },
        {
            Header: 'Price',
            accessor: 'price',
        },
        {
            id: 'status',
            Header: 'Approval Status',
            Cell: ({ row }) => {
                if (row.original.approvalStatus === 'Approve') {
                    return <div className="italic underline text-green-500">Approved</div>
                } else if (row.original.approvalStatus === 'Pending') {
                    return <div className="italic underline text-orange-500">Pending</div>
                } else if (row.original.approvalStatus === 'Rejected') {
                    return <div className="italic underline text-red-500">Rejected</div>
                }
            },
        },
        {
            Header: 'Actions',
            Cell: ({ row }) => {
                return (
                    <Link to={`/vet/${row.original.courseId}`}>
                        <div className="italic underline text-blue-500">View more details</div>
                    </Link>
                )
            },
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <div className="px-4 py-4 mx-20 bg-background space-y-2 mr-24">
                <div className="flex float-right items-center">
                    <Link to="/createcourse">
                        <button className="bg-slate-400 rounded-md p-2 text-sm">Create Course</button>
                    </Link>
                </div>
                {created_courses && <BigTable columns={columns} data={created_courses} />}
            </div>
        </div>
    )
}
export default InstructorCourseList
