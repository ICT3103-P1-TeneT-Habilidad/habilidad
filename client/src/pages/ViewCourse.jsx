import { React, useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { languageOptions } from '../utils/Constants'
import { v4 as uuid } from 'uuid'
import imagePlaceholder from '../assets/no-image.jpg'
import { useAppContext } from '../context/appContext'

const ViewCourse = () => {
    const tempData = {
        courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
        courseName: 'dumb',
        imageUrl: 'https://res.cloudinary.com/drznyznmo/image/upload/v1667308005/xhgr8cefstr8t0uu8nn0.jpg',
        duration: 10000,
        price: 10.99,
        description: 'test_course_1_des',
        language: 'ENGLISH',
        courseMaterial: [
            { title: 'first', url: 'https://media.giphy.com/media/XGxlscqR85DNeRRIII/giphy.gif', order: 1 },
            { title: 'second', url: 'https://giphy.com/clips/crunchyroll-girlfriend-rent-rent-a-girlfriend-EzBQcKLCD7AiOhRs70', order: 2 },
        ],
        topicCourse: [
            {
                topicCourseId: '017855b1-58f4-4efd-b1ab-ce74857745a8',
                courseId: 'd9f4092c-b629-494d-b223-fb5c9b076b4a',
                topicId: '791ecc1c-4729-4838-b4bc-81cdf4ba10f3',
            },
        ],
    }
}

export default ViewCourse
