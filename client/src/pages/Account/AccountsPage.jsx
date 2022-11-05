import React, { useEffect } from 'react'
import { BigTable } from '../../components'
import { useAppContext } from '../../context/appContext'
import moment from 'moment'

const AccountsPage = () => {
    const { user_data, getAllUsers } = useAppContext()

    useEffect(() => {
        getAllUsers()
        // eslint-disable-next-line
    }, [])

    const columns = [
        {
            Header: 'username',
            accessor: 'username',
        },
        {
            Header: 'email',
            accessor: 'email',
        },
        {
            Header: 'role',
            accessor: 'role',
        },
        // {
        //     Header: 'Account Status',
        //     accessor: 'accountStatus',
        // },
        {
            Header: 'last updated',
            accessor: 'updatedOn',
            Cell: ({ row }) => {
                let date = row.original.updatedOn
                return <div className="text-sm text-gray-900">{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</div>
            },
        },
        {
            id: 'Actions',
            Header: 'Actions',
            Cell: ({ row }) => {
                const { activateUser, deactivateUser } = useAppContext()

                if (row.original.deactivationDate !== null) {
                    return (
                        <div className="p-2">
                            <button
                                type="button"
                                className="rounded-md bg-red-500 text-white p-2"
                                onClick={() => {
                                    deactivateUser(row.original.email)
                                }}
                            >
                                Deactivate
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <div className="p-2">
                            <button
                                type="button"
                                className="rounded-md bg-emerald-600 text-white p-2"
                                onClick={() => {
                                    activateUser(row.original.userId)
                                }}
                            >
                                Activate
                            </button>
                        </div>
                    )
                }
            },
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* <div className="px-4 py-4 mx-24 bg-background space-y-2 mr-24">
                <div className="flex justify-end mt-4">
                    <Link to="/create-user" className="flex-1">
                        <button
                            type="button"
                            className="float-right inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-slate-500 focus:outline-none"
                        >
                            Create New User
                        </button>
                    </Link>
                </div>
            </div> */}
            {user_data && <BigTable columns={columns} data={user_data.result} />}
        </div>
    )
}

export default AccountsPage
