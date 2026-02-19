import './Budgets.css'
import { SideBar } from '../../components/SideBar'
import { SpendingSummary } from './SpendingSummary'
import { OneBudget } from './OneBudget'
import { useState } from 'react'
// import plusIcon 
import { AddBudget } from './AddBudget'

export function Budgets({ moneyData, chosenTab, setChosenTab }) {

    const budgetData = moneyData.budgets
    const transactions = moneyData.transactions

    const [budgetButton, setBudgetButton] = useState({
        action: 'add',
        show: false
    })
    const [deleteBudget, setDeleteBudget] = useState(false)

    const toggleBudgetButtonAdd = (action) => {
        setBudgetButton({
            action: action,
            show: !budgetButton.show
        })
    }

    return (
        <div className='page-layout'>
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="main-page-budgets">
                <div className="budgets-header">
                    <h2>Budgets</h2>
                    <button onClick={() => toggleBudgetButtonAdd('add')}>Add New Budget</button>
                </div>
                <div className="budget-dashboard">
                    <SpendingSummary budgetData={budgetData} transactions={transactions} />
                    <div className="budgets-column">
                        {Array.isArray(budgetData) && budgetData.length > 0
                            && budgetData.map((budget, index) => {
                                return <OneBudget key={index} budgetButton={budgetButton} setBudgetButton={setBudgetButton} OneBudgetData={budget} transactions={transactions} deleteBudget={deleteBudget} setDeleteBudget={setDeleteBudget} />
                            })
                        }
                    </div>
                </div>
            </div>
            {budgetButton.show &&
                <AddBudget budgetButton={budgetButton} setBudgetButton={setBudgetButton}></AddBudget>
            }
        </div>
    )
}