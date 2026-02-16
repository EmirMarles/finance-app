import './TransactionsBoard.css'
import { OneTransaction } from './OneTransaction'
import IconSearch from '../../public/assets/images/icon-search.svg?react'
import ArrowDown from '../../public/assets/images/icon-caret-down.svg?react'
import IconRight from '../../public/assets/images/icon-caret-right.svg?react'
import IconLeft from '../../public/assets/images/icon-caret-left.svg?react'

import { useState, useRef, useEffect } from 'react'
import { countTransactionsPages } from '../../utils/Helper'
import { getAllCategories, filterTransactions } from '../../utils/Helper'
import { useDebouncedSearch } from '../../customHooks/useDebouncedSearch'

export function TransactionsBoard({ transactions }) {

    const [inputSearch, setInputSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [transPerPage, setTransPerPage] = useState(18)
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

    const [transactionsForDisplay, setTransactionsForDisplay] = useState(transactions)

    const [loading, setLoading] = useState({
        blinkInputFocus: false,
        isLoading: false
    })

    // effect for search
    const search = useDebouncedSearch(inputSearch)

    useEffect(() => {
        // searching done in here and then setting it up
        console.log(search)
    }, [search])

    const inputRef = useRef(null)

    const handleInputSearch = (event) => {
        setInputSearch(event.target.value)
    }

    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            setLoading(prev => ({
                ...prev,
                blinkInputFocus: true
            }))
        }
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
            <div className="board-header">
                <div className="input-search" onClick={handleInputFocus}>
                    {loading.blinkInputFocus
                        ? <p>
                            {inputSearch}
                            <span className='blink'>|</span>
                        </p>
                        : <p>type in to search</p>
                    }
                    <IconSearch className='search-icon'></IconSearch>
                    <input ref={inputRef} type="text" onChange={handleInputSearch} />
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
            <div className="transactions-table">
                <div className="transactions-table-h">
                    <p className='rec-sender'>Recipient/Sender</p>
                    <p>Category</p>
                    <p>Transaction Date</p>
                    <p>Amount</p>
                </div>

                <div className="transactions-rows">
                    {Array.isArray(currentTransactions) &&
                        // transactions.slice(currentPage, transPerPage)
                        currentTransactions.map((transaction, index) => {
                            return <OneTransaction key={index} transaction={transaction}></OneTransaction>
                        })
                    }
                </div>

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
            </div>
        </div>
    )
}