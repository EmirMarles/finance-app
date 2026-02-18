import './RecurringHomePage.css'
import IconCaretRight from '../public/assets/images/icon-caret-right.svg?react'
import { useNavigate } from 'react-router-dom'

export function RecurringHomePage({ transactions, moneyData }) {

    const recurringTransactions = transactions.filter(transaction => transaction.recurring === true)
    const firstThreeRecurring = recurringTransactions.slice(0, 3)
    const navigate = useNavigate()

    const handleNavigateToRecurring = () => {
        navigate('/recurring-bills')
    }

    const budgetData = moneyData.budgets   
    
    const getThemeForRecurring = (transaction) => {
        const matchingBudget = budgetData.find(budget => budget.category === transaction.category);
        return matchingBudget ? matchingBudget.theme : '#82C9D7';
    }

    return (
        <div className="b recurring-bills-home" style={{ gridArea: 'box4' }}>
            <div className="bills-header">
                <h3>Recurring bills</h3>
                <button onClick={handleNavigateToRecurring}>See more<IconCaretRight className="icon-caret-right"></IconCaretRight></button>
            </div>
            <div className="bills-grid-home">
                {Array.isArray(firstThreeRecurring) && firstThreeRecurring.length > 0 ? (
                    firstThreeRecurring.map((transaction, index) => (
                        <div key={index} className='first' style={{ "--recurring-home-color": getThemeForRecurring(transaction)}}>
                            <p>{transaction.name}</p>
                            <h3>${transaction.amount}</h3>
                        </div>
                    ))
                ) : (
                    <p>No recurring bills available</p>
                )}
                {/* <div className="first">
                    <p>Paid bills</p>
                    <h3>$120.00</h3>
                </div>
                <div className="first">
                    <p>Total Upcoming</p>
                    <h3>$120.00</h3>
                </div>
                <div className="first">
                    <p>Due Soon</p>
                    <h3>$45.00</h3>
                </div> */}
            </div>
        </div>
    )
}   