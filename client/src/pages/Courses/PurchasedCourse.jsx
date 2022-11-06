import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { BigTable } from '../../components'
import { Link } from 'react-router-dom'

const PurchasedCourse = () => {
    const { getPurchasedCourses, purchased_courses } = useAppContext()

    useEffect(() => {
        getPurchasedCourses()
    }, [])

    const columns = [
        {
            Header: 'Course Name',
            accessor: 'courseName',
        },
        {
            Header: 'Instructor',
            Cell: ({ row }) => {
                return <div>{row.original.instructor.user.name}</div>
            },
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
            id: 'Actions',
            Header: 'View Course',
            Cell: ({ row }) => {
                if (row.original.approvalStatus !== 'Approve') {
                    return (
                        <Link to={`/studentviewcourse/${row.original.courseId}`}>
                            <div className="italic underline text-blue-500">View course</div>
                        </Link>
                    )
                }
            },
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            {purchased_courses && <BigTable columns={columns} data={purchased_courses} />}
        </div>
    )
}

export default PurchasedCourse
