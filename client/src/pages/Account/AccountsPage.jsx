import React from 'react'
import { BigTable } from '../../components'
// import icons
import { MdModeEditOutline } from 'react-icons/md'

const AccountsPage = () => {
    const data = [
        {
            username: 'Test',
            role: 'Student',
            email: 'test@test.com',
            lastUpdated: '23/4/22',
            accountStatus: 'Active',
        },
        {
            username: 'Test2',
            role: 'Instructor',
            email: 'test@test.com',
            lastUpdated: '23/4/22',
            accountStatus: 'Inactive',
        },
    ]

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
        {
            Header: 'Account Status',
            accessor: 'accountStatus',
        },
        {
            Header: 'last updated',
            accessor: 'lastUpdated',
        },
        {
            id: 'Actions',
            Header: 'Actions',
            Cell: () => {
                return (
                    <div>
                        <button type="button">
                            <MdModeEditOutline />
                        </button>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="min-h-screen">
            <BigTable columns={columns} data={data} />
        </div>
    )
}

export default AccountsPage
