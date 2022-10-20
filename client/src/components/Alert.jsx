import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert = () => {
    const { alert_type, alert_msg } = useAppContext()
    console.log(alert_msg)

    return renderAlert(alert_type, alert_msg)
}

const renderAlert = (type, msg) => {
    if (type === 'success') {
        return (
            <div className="bg-green-50 p-4">
                <span>{msg}</span>
            </div>
        )
    } else if (type === 'danger') {
        return (
            <div className="bg-red-50 p-4">
                <span>{msg}</span>
            </div>
        )
    }
}

export default Alert
