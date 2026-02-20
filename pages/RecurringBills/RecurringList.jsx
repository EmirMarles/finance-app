import './RecurringList.css'
import { formatTimeForRecurring } from '../../utils/Helper'
import IconSearch from '../../public/assets/images/icon-search.svg?react'
import IconCaretDown from '../../public/assets/images/icon-caret-down.svg?react'
import { useDebouncedSearch } from '../../customHooks/useDebouncedSearch'

import { useState, useEffect } from 'react'

export function RecurringList({ recurringBillsData }) {

    const [searchInput, setSearchInput] = useState('')
    const [billsForDisplay, setBillsForDisplay] = useState([])
    const [billsFilter, setBillsFilter] = useState({
        filter: 'latest',
        show: false
    })

    const searchQuery = useDebouncedSearch(searchInput)

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const toggleShowFilter = () => {
        setBillsFilter(prev => ({
            ...prev,
            show: !billsFilter.show
        }))
    }

    const toggleFilters = (filter) => {
        setBillsFilter(prev => ({
            ...prev,
            filter: filter
        }))
    }

    useEffect(() => {
        console.log(searchQuery)
    }, [searchQuery])

    useEffect(() => {
        setBillsForDisplay(recurringBillsData)
    }, [recurringBillsData])

    return (
        <div className="recurring-list">
            <div className="list-header">
                {/* <p>{searchInput}</p> */}
                <div className="searc-list">
                    <input type="text" placeholder='Search bills' onChange={handleSearchInput} />
                    <IconSearch className='icon-search-input'></IconSearch>
                </div>
                <div className="sort-by">
                    Sort by
                    <button className='sort-button' onClick={toggleShowFilter}>
                        {billsFilter.filter}
                        <IconCaretDown></IconCaretDown>
                        {billsFilter.show &&
                            <div className='filters'>
                                <p onClick={() => toggleFilters('Latest')}>Latest</p>
                                <p onClick={() => toggleFilters('Newest')}>Newest</p>
                            </div>
                        }
                    </button>
                </div>
            </div>
            <div className="list-of-recurring">
                {Array.isArray(billsForDisplay) && billsForDisplay.length > 0 ?
                    recurringBillsData.map((bill, index) => {
                        return <div key={index} className="one-recurring-bill">
                            <div className="bill-name">
                                <img src={bill.avatar} alt="avatar" className="avatar" />
                                <h5>{bill.name}</h5>
                            </div>
                            <div className="due-date">
                                <p>Monthly {formatTimeForRecurring(bill.date)}</p>
                            </div>
                            <div className="bill-amount">
                                <h5>${bill.amount}</h5>
                            </div>
                        </div>
                    })
                    : <div className='no-bills'>
                        <p>No Recurring Bills</p>
                    </div>
                }
            </div>
        </div>
    )
}