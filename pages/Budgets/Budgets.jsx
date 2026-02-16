import './Budgets.css'
import { SideBar } from '../../components/SideBar'
import { SpendingSummary } from './SpendingSummary'
import { OneBudget } from './OneBudget'

export function Budgets({ moneyData, chosenTab, setChosenTab }) {

    const budgetData = moneyData.budgets
    const transactions = moneyData.transactions

    const oneBudget = {
        "category": "Entertainment",
        "maximum": 50.00,
        "theme": "#277C78"
    }

    return (
        <div className='page-layout'>
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="main-page-budgets">
                <div className="budgets-header">
                    <h2>Budgets</h2>
                    <button>Add New Budget</button>
                </div>
                <div className="budget-dashboard">
                    <SpendingSummary />
                    <div className="budgets-column">
                        {Array.isArray(budgetData) && budgetData.length > 0
                            && budgetData.map((budget, index) => {
                                return <OneBudget key={index} OneBudgetData={budget} transactions={transactions} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}