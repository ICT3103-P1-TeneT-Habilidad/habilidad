import React from 'react'

const CourseContentNav = ({ data, navClickHandler }) => {
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-row w-full p-3 place-content-center">
                    <p className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Content</p>
                </div>
                <hr className="p-3" />
                {data?.map((material) => (
                    <div key={material.courseMaterialId} className="flex flex-row w-full place-content-center p-3">
                        <button
                            className="block uppercase tracking-wide underline text-blue-700 text-sm font-bold mb-2"
                            onClick={() => navClickHandler(material.courseMaterialId)}
                        >
                            Lesson {material.order}: {material.title}
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CourseContentNav
