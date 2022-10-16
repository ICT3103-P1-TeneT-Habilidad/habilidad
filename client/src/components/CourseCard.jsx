import React from 'react'
import Temp_photo from '../assets/temp_course_card.jpg'

const CourseCard = () => {
    const data = [
        {
            courseId: '123123',
            courseName: 'Learning Python',
            duration: '10 mins',
            price: 20,
            description: "print('hello world')",
            language: 'English',
            status: 'Ongoing',
            approvalStatus: 'Completed',
            createdOn: '26/05/22',
            updatedOn: '26/05/22',
            instructor: 'John Tan',
            instructorId: '0123-4567-8901-2345',
        },
        {
            courseId: '321321',
            courseName: 'Learning C#',
            duration: '10 mins',
            price: 20,
            description: "print('hello world')",
            language: 'English',
            status: 'Ongoing',
            approvalStatus: 'Completed',
            createdOn: '26/05/22',
            updatedOn: '26/05/22',
            instructor: 'John Tan',
            instructorId: '0123-4567-8901-2345',
        },
        {
            courseId: '321321',
            courseName: 'Learning C#',
            duration: '10 mins',
            price: 20,
            description: "print('hello world')",
            language: 'English',
            status: 'Ongoing',
            approvalStatus: 'Completed',
            createdOn: '26/05/22',
            updatedOn: '26/05/22',
            instructor: 'John Tan',
            instructorId: '0123-4567-8901-2345',
        },
        {
            courseId: '321321',
            courseName: 'Learning C#',
            duration: '10 mins',
            price: 20,
            description: "print('hello world')",
            language: 'English',
            status: 'Ongoing',
            approvalStatus: 'Completed',
            createdOn: '26/05/22',
            updatedOn: '26/05/22',
            instructor: 'John Tan',
            instructorId: '0123-4567-8901-2345',
        },
        {
            courseId: '321321',
            courseName: 'Learning C#',
            duration: '10 mins',
            price: 20,
            description: "print('hello world')",
            language: 'English',
            status: 'Ongoing',
            approvalStatus: 'Completed',
            createdOn: '26/05/22',
            updatedOn: '26/05/22',
            instructor: 'John Tan',
            instructorId: '0123-4567-8901-2345',
        },
    ]

    return (
        <div className="grid lg:grid-cols-5 lg:gap-y-4 lg:gap-x-5 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-5">
            {data.map((data) => (
                <div
                    key={data.courseId}
                    className="bg-white border border-black flex flex-col overflow-hidden h-full relative w-auto"
                >
                    <div className="aspect-square relative">
                        <img src={Temp_photo} alt="card" className="w-full h-full object-scale-down"></img>
                    </div>
                    {/* description */}
                    <div className="flex flex-col p-5">
                        <span className="text-lg">{data.courseName}</span>
                        <span className="text-md">{data.instructor}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseCard
