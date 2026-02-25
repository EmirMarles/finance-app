import './TransactionsBoard.css'
import { OneTransaction } from './OneTransaction'

import IconSearch from '../../public/assets/images/icon-search.svg?react'
import ArrowDown from '../../public/assets/images/icon-caret-down.svg?react'
import IconRight from '../../public/assets/images/icon-caret-right.svg?react'
import IconLeft from '../../public/assets/images/icon-caret-left.svg?react'
import IconFilterMobile from '../../public/assets/images/icon-filter-mobile.svg?react'
import IconSortMobile from '../../public/assets/images/icon-sort-mobile.svg?react'

import { useState, useEffect } from 'react'
import { countTransactionsPages } from '../../utils/Helper'
import { getAllCategories, filterTransactions } from '../../utils/Helper'
import { useDebouncedSearch } from '../../customHooks/useDebouncedSearch'
import { searchForBills } from '../../utils/Helper'

import { PHONE_WIDTH } from '../../consts/windowWidth'
import { useWindowWidth } from '../../customHooks/useWindowWidth'

export function TransactionsBoard({ transactions }) {

    const [inputSearch, setInputSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [transPerPage, setTransPerPage] = useState(17)
    const [totalPages, setTotalPages] = useState(() => {
        return countTransactionsPages(transactions)
    })
    const [filter, setFilter] = useState({
        isOpen: false,
        filter: 'Latest'
    })
    const [category, setCategory] = useState({
        isOpen: false,
        category: 'Bills'
    })
    const [loading, setLoading] = useState(false)
    const [transactionsForDisplay, setTransactionsForDisplay] = useState(transactions)

    useEffect(() => {
        if (transactionsForDisplay.length > 0) return
        setTransactionsForDisplay(transactions)
    }, [transactions, transactionsForDisplay])

    useEffect(() => {
        setTotalPages(countTransactionsPages(transactions))
    }, [totalPages, transactions])

    const searchQuery = useDebouncedSearch(inputSearch)

    useEffect(() => {
        if (inputSearch.length === 0) {
            setLoading(false)
            setTransactionsForDisplay(transactions)
        }
    }, [inputSearch])

    useEffect(() => {
        if (searchQuery.length === 0) {
            setTransactionsForDisplay(transactions)
            return
        }
        // searching done in here and then setting it up
        const result = searchForBills(searchQuery, transactions)
        if (result.length > 0) {
            setLoading(false)
            setTransactionsForDisplay(result)
        }
        else {
            setLoading(false)
            setTransactionsForDisplay([])
        }
        console.log('result of search', result)
    }, [searchQuery])

    const width = useWindowWidth();

    const handleInputSearch = (event) => {
        setLoading(true)
        setInputSearch(event.target.value)
    }

    const togglePages = (action) => {
        if (action === '+') {
            if (currentPage >= totalPages) return
            setCurrentPage(currentPage + 1)
        }
        if (action === '-') {
            if (currentPage <= 1) return
            setCurrentPage(currentPage - 1)
        }
    }

    const setPages = (i) => {
        setCurrentPage(i)
    }

    const toggleCategoryOpen = () => {
        setCategory(prev => ({
            ...prev,
            isOpen: !category.isOpen
        }))
    }

    const toggleFilterOpen = () => {
        setFilter(prev => ({
            ...prev,
            isOpen: !filter.isOpen
        }))
    }

    const toggleFilters = (action) => {
        if (action === 'new') {
            setFilter(prev => ({
                ...prev,
                filter: 'Newest'
            }))
        } else if (action === 'late') {
            setFilter(prev => ({
                ...prev,
                filter: 'Latest'
            }))
        }
    }

    const categories = getAllCategories(transactions)

    const toggleCategories = (categoryId) => {
        const found = categories.find((category) => category.categoryId === categoryId)
        setCategory(prev => ({
            ...prev,
            category: found.category
        }))

        const filteredTransactions = filterTransactions(filter.filter, found, transactions)
        setTotalPages(countTransactionsPages(filteredTransactions))
        setTransactionsForDisplay(filteredTransactions)
    }

    const lastTransactionIndex = currentPage * transPerPage;
    const firstTransactionIndex = lastTransactionIndex - transPerPage;
    const currentTransactions = transactionsForDisplay.slice(firstTransactionIndex, lastTransactionIndex)

    return (
        <div className='board'>
            {width < PHONE_WIDTH
                ? <div className='phone-board-header'>
                    <div className="input-search">
                        <input type="text" onChange={handleInputSearch} placeholder='Search transactions' />
                        <IconSearch className='search-icon'></IconSearch>
                    </div>
                    <IconSortMobile className='icon-filter'></IconSortMobile>
                    <IconFilterMobile className='icon-filter'></IconFilterMobile>
                </div>
                : <div className="board-header">
                    <div className="input-search">
                        <input type="text" onChange={handleInputSearch} />
                        <IconSearch className='search-icon'></IconSearch>
                    </div>
                    <div className='sort-cat'>
                        <div className="category">
                            <p>Sort by</p>
                            <button className='category-btn' onClick={toggleFilterOpen}>
                                {filter.filter}
                                <ArrowDown></ArrowDown>
                                {filter.isOpen &&
                                    <div className="filter-window">
                                        <span onClick={() => toggleFilters('late')}>Latest</span>
                                        <span onClick={() => toggleFilters('new')}>Newest</span>
                                    </div>
                                }
                            </button>
                        </div>
                        <div className="category">
                            <p>Category</p>
                            <button className='category-btn' onClick={toggleCategoryOpen}>
                                {category.category}
                                <ArrowDown></ArrowDown>
                                {category.isOpen
                                    &&
                                    <div className="filter-window">
                                        {Array.isArray(categories) && categories.length > 0 &&
                                            categories.map((category) => {
                                                return <span onClick={() => toggleCategories(category.categoryId)} key={category.categoryId}>{category.category}</span>
                                            })
                                        }
                                    </div>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="transactions-table">
                <div className="transactions-table-h">
                    <p className='rec-sender'>Recipient/Sender</p>
                    <p className='cat-h'>Category</p>
                    <p className='trans-h'>Transaction Date</p>
                    <p className='amount-h'>Amount</p>
                </div>

                <div className="transactions-rows">
                    {!loading
                        ? Array.isArray(currentTransactions) && currentTransactions.length > 0 ?
                            currentTransactions.map((transaction, index) => {
                                return <OneTransaction key={index} transaction={transaction}></OneTransaction>
                            })
                            : <div>No such transactions...</div>
                        : <div>Loading...</div>
                    }
                </div>
                {!loading && currentTransactions.length > 0 &&
                    <div className="pages-buttons">
                        <button className="prev-button prev" onClick={() => { togglePages('-') }}>
                            <IconLeft></IconLeft>
                            Prev
                        </button>
                        <div className="pages">
                            {totalPages > 0
                                && Array.from({ length: totalPages }, (_, i) => (
                                    <div key={i} className={currentPage === i + 1 ? 'page-container chosen-pag' : 'page-container'} onClick={() => setPages(i + 1)}>
                                        {i + 1}
                                    </div>
                                ))
                            }
                        </div>
                        <button className="prev-button next" onClick={() => { togglePages('+') }}>
                            Next
                            <IconRight></IconRight>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}