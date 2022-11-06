import { useAppContext } from '../context/appContext'
import { Outlet, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Error404 } from '../pages'

const RbacNavItem = ({ children, permissiveRole }) => {
    const { user_details } = useAppContext()
    const { role } = user_details
    const hasPermission = permissiveRole[role] ? true : false

    if (!hasPermission) return <></>

    return <>{children}</>
}
const RbacRoute = ({ permissiveRole }) => {
    const { user_details, user } = useAppContext()

    const { role } = user_details
    const hasPermission = permissiveRole[role] ? true : false

    if (user?.accessToken) {
        if (hasPermission) return <Outlet />
        else return <Error404 />
    } else return <Navigate to="/login" />
}

const RBAC = ({ children, permissiveRole }) => {
    const { user_details, getUserDetails } = useAppContext()

    useEffect(() => {
        if (!user_details) getUserDetails()
    }, [])

    return children ? (
        <RbacNavItem children={children} permissiveRole={permissiveRole} />
    ) : (
        <RbacRoute permissiveRole={permissiveRole} />
    )
}

export default RBAC
