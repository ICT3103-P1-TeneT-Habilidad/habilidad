import React from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination, useAsyncDebounce } from 'react-table'

// Filter function for the search bar
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">Search: </span>
            <input
                type="text"
                className="rounded-md border border-gray-300 shadow-sm px-2"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
                placeholder={`${count} records...`}
            />
        </label>
    )
}

// Table function
function BigTable({ columns, data }) {
    // React-table states and functions
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,

        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <>
            <div className="hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8  py-5 rounded-md">
                    <div className="flex flex-col mt-2">
                        {/* Start of Search Bar */}
                        <div className="m-2">
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </div>
                        {/* End of Search Bar */}
                        {/* Start of Table */}
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    {headerGroups.map((headerGroup) => {
                                        const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
                                        return (
                                            <tr key={key} {...restHeaderGroupProps}>
                                                {headerGroup.headers.map((column) => {
                                                    const { key, ...restColumn } = column.getHeaderProps(
                                                        column.getSortByToggleProps(),
                                                        {
                                                            style: { width: '10px' },
                                                        }
                                                    )
                                                    return (
                                                        <th
                                                            key={key}
                                                            {...restColumn}
                                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            <div>
                                                                {column.render('Header')}
                                                                <span>
                                                                    {column.isSorted
                                                                        ? column.isSortedDesc
                                                                            ? ' ▼'
                                                                            : ' ▲'
                                                                        : ''}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </thead>
                                <tbody {...getTableBodyProps} className="bg-white divide-y divide-gray-200">
                                    {page.map((row) => {
                                        prepareRow(row)
                                        const { key, ...restRowProps } = row.getRowProps()
                                        return (
                                            <tr key={key} {...restRowProps} className="bg-white">
                                                {row.cells.map((cell) => {
                                                    const { key, ...restCellProps } = cell.getCellProps()
                                                    return (
                                                        <td
                                                            key={key}
                                                            {...restCellProps}
                                                            className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500"
                                                        >
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* End of Table */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BigTable
