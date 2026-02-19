import './OneBudget.css'
import { calculateMoneySpentOnCategory, calculatePercentageBudgetSpent, getLatestTransactionsByCategory } from '../../utils/Helper'
import { useState } from 'react';
import { addDollarSign } from '../../utils/moneyDataManilpulation';
import { formatTime } from '../../utils/Helper';
import Ellipsis from '../../public/assets/images/icon-ellipsis.svg?react'

export function OneBudget({ budgetButton, setBudgetButton, OneBudgetData, transactions, deleteBudget, setDeleteBudget }) {

    const [showBudgetOptions, setShowBudgetOptions] = useState(false)

    const moneySpent = calculateMoneySpentOnCategory(OneBudgetData.category, transactions)
    const percentage = calculatePercentageBudgetSpent(OneBudgetData.maximum, moneySpent)
    const threeLatestTransactions = getLatestTransactionsByCategory(transactions, OneBudgetData.category)

    const handleOpenOptions = () => {
        setShowBudgetOptions(!showBudgetOptions)
    }

    const handleOpenDeleteOption = (action) => {
        setBudgetButton({
            action: action,
            show: true
        })
    }

    return (
        <div className='budget-card'
            style={{ "--color-themes": OneBudgetData.theme }}
        >
            <div className="card-header">
                <div className="together">
                    <div className="theme"></div>
                    <h4>{OneBudgetData.category}</h4>
                </div>

                <div className="ellipsis-container">
                    <Ellipsis className='ellipsis' onClick={handleOpenOptions}></Ellipsis>
                    {showBudgetOptions &&
                        <div className="options-edit-delete">
                            <p className='option-edit' onClick={()=>handleOpenDeleteOption('edit')}>Edit Budget</p>
                            <p className='option-edit' onClick={()=>handleOpenDeleteOption('delete')}>Delete Budget</p>
                        </div>
                    }
                </div>

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