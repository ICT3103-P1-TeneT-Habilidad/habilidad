import React from 'react'

const NewCourseMaterial = ({ fileHandler, keyId }) => {

    return (
        <>
            <input
                type="file"
                onChange={(e) => {
                    fileHandler(e.target.files[0], keyId)
                }}
                hidden
            />
        </>
    )
}

export default NewCourseMaterial
