import './RecurringList.css'
import { formatTimeForRecurring, sortRecurringBills } from '../../utils/Helper'
import IconSearch from '../../public/assets/images/icon-search.svg?react'
import IconCaretDown from '../../public/assets/images/icon-caret-down.svg?react'
import { useDebouncedSearch } from '../../customHooks/useDebouncedSearch'
import { searchForBills } from '../../utils/Helper'
import { useState, useEffect } from 'react'

import { useWindowWidth } from '../../customHooks/useWindowWidth'
import { PHONE_WIDTH } from '../../consts/windowWidth'
import IconSortMobile from '../../public/assets/images/icon-sort-mobile.svg?react'

export function RecurringList({ recurringBillsData }) {

    const [searchInput, setSearchInput] = useState('')
    const [billsForDisplay, setBillsForDisplay] = useState([])
    const [billsFilter, setBillsFilter] = useState({
        filter: 'latest',
        show: false
    })
    const [loading, setLoading] = useState(false)

    const searchQuery = useDebouncedSearch(searchInput)
    const width = useWindowWidth();

    const handleSearchInput = (e) => {
        setLoading(true)
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

        //
    }

    useEffect(() => {
        if (searchInput.length <= 0) {
            setLoading(false);
            setBillsForDisplay(recurringBillsData)
        }
    }, [searchInput])

    useEffect(() => {
        if (searchQuery.length === 0) {
            setLoading(false)
            setBillsForDisplay(recurringBillsData)
            return
        }
        const result = searchForBills(searchQuery, recurringBillsData)
        if (result) {
            setBillsForDisplay(result)
        }
        setLoading(false)
    }, [searchQuery])

    useEffect(() => {
        if (billsForDisplay.length > 0) return
        setBillsForDisplay(recurringBillsData)
        console.log('recurring bills data', recurringBillsData)
    }, [recurringBillsData, billsForDisplay])

    // filters
    useEffect(() => {
        if (billsForDisplay.length <= 0 ) return
        const sortedList = sortRecurringBills(billsForDisplay, billsFilter.filter);
        console.log('sorted list:', sortedList)
        setBillsForDisplay(sortedList)
    }, [billsForDisplay, billsFilter])

    return (
        <div className="recurring-list">
            {width > PHONE_WIDTH
                ? <div className="list-header">
                    <div className="searc-list">
                        <input type="text" placeholder='Search bills' onChange={handleSearchInput} />
                        <IconSearch className='icon-search-input'></IconSearch>
                    </div>
                    <div className="sort-by">
                        Sort by
                        <button className='sort-button' onClick={toggleShowFilter}>
                            <p className='filter-applied'>{billsFilter.filter}</p>
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
                : <div className='mobile-list-header'>
                    <div className="searc-list">
                        <input type="text" placeholder='Search bills' onChange={handleSearchInput} />
                        <IconSearch className='icon-search-input'></IconSearch>
                    </div>
                    <IconSortMobile></IconSortMobile>
                </div>
            }

            <div className="list-of-recurring">
                {loading
                    ? <div className='loading'>Loading...</div>
                    : Array.isArray(billsForDisplay) && billsForDisplay.length > 0 ?
                        billsForDisplay.map((bill, index) => {
                            return <div key={index} className="one-recurring-bill">
                                <div className="bill-name">
                                    <img src={bill.avatar} alt="avatar" className="avatar" />
                                    <h5>{bill.name}</h5>
                                </div>
                                <div className="due-date">
                                    <p>Monthly {formatTimeForRecurring(bill.date)}</p>
                                </div>
                                <div className="bill-amount">
                                    <h5>${bill.amount * -1}</h5>
                                </div>
                            </div>
                        })
                        : <div className='no-bills'>
                            <div>No Such Recurring Bills</div>
                        </div>
                }
            </div>
        </div>
    )
}