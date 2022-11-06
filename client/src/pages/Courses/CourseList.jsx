import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { BigTable } from '../../components'
import { Link } from 'react-router-dom'

const CourseList = () => {
    const { courses, getAllCourses } = useAppContext()

    useEffect(() => {
        getAllCourses()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(courses)
    }, [courses])

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
            Header: 'Pending Approval',
            Cell: ({ row }) => {
                if (row.original.approvalStatus !== 'Approve') {
                    return (
                        <Link to={`/vet/${row.original.courseId}`}>
                            <div className="italic underline text-blue-500">View more details</div>
                        </Link>
                    )
                }
            },
        },
    ]

    return <div className="min-h-screen bg-background">{courses && <BigTable columns={columns} data={courses} />}</div>
    // return(
    //     <div>
    //         {courses ? <div>Test</div> : <div>Scam</div>}
    //     </div>
    // )
}

export default CourseList
