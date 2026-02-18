import './OneBudget.css'
import { calculateMoneySpentOnCategory, calculatePercentageBudgetSpent, getLatestTransactionsByCategory } from '../../utils/Helper'
import { useEffect } from 'react';
import { addDollarSign } from '../../utils/moneyDataManilpulation';
import { formatTime } from '../../utils/Helper';

export function OneBudget({ OneBudgetData, transactions }) {

    // function to get the latest spendings 
    // function to calculate the amount spent on this category   

    // useEffect(() => {
    //     console.log('setting the following theme:', OneBudgetData.theme)
    //     document.documentElement.style.setProperty('--color', OneBudgetData.theme);
    // }, [OneBudgetData.theme])

    // const oneBudget = {
    //     "category": "Entertainment",
    //     "maximum": 50.00,
    //     "theme": "rgb(39, 124, 120)"
    // }

    const moneySpent = calculateMoneySpentOnCategory(OneBudgetData.category, transactions)
    const percentage = calculatePercentageBudgetSpent(OneBudgetData.maximum, moneySpent)
    const threeLatestTransactions = getLatestTransactionsByCategory(transactions, OneBudgetData.category)

    return (
        <div className='budget-card'
            style={{ "--color-themes": OneBudgetData.theme }}
        >
            <div className="card-header">
                <div className="theme"></div>
                <h4>{OneBudgetData.category}</h4>
            </div>
            <div className="one-budget-data">
                <span className='maximum-p'>Maximum of ${OneBudgetData.maximum}</span>
                <progress className="budget-progress" value={percentage} max={100}></progress>
                <div className="spent-remaining">
                    <div className="spent">
                        <p>Spent</p>
                        <p>${moneySpent}</p>
                    </div>
                    <div className="remaining">
                        <p>Remaning</p>
                        <p>${OneBudgetData.maximum - moneySpent}</p>
                    </div>
                </div>
            </div>

            <div className="latest-spending">
                <div className='latest-spending-head'>
                    <h4>Latest spending</h4>
                    <p>See All</p>
                </div>
                {Array.isArray(threeLatestTransactions) && threeLatestTransactions.length > 0
                    && threeLatestTransactions.map((transaction, index) => {
                        return <div className='last-transaction'>
                            <div className="avatar-late">
                                <img src={transaction.avatar} alt="" />
                                {transaction.name}
                            </div>
                            <div className="latest-data">
                                <p>{addDollarSign(transaction.amount)}</p>
                                <p>{formatTime(transaction.date, true)}</p>
                            </div>
                        </div>
                    })
                }
                <span></span>
            </div>
        </div>
    )
}