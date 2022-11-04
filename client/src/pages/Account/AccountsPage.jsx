import React, {useEffect} from 'react'
import { BigTable } from '../../components'
import { useAppContext } from '../../context/appContext'
import moment from 'moment'
// import icons
import { MdModeEditOutline } from 'react-icons/md'

const AccountsPage = () => {
    const {user_data, getAllUsers} = useAppContext()

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
        console.log(user_data)
    }, [user_data])

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
                let date = row.original.updatedOn;
                return (
                  <div className="text-sm text-gray-900">
                    {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
                  </div>
                );
              }
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
            {user_data && <BigTable columns={columns} data={user_data.result} />}
        </div>
    )
}

export default AccountsPage
