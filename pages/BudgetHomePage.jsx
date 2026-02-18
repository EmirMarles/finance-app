import './BudgetHomePage.css'
import { PieChart } from './Budgets/PieChart'

export function BudgetHomePage({ moneyData, chosenTab, setChosenTab }) {

    const transactions = moneyData.transactions
    const budgetData = moneyData.budgets
    return (
        <div className="b budgets" style={{ gridArea: 'box2' }}>
            {/* <div className="doughnut"> */}
            <div className="budgets-header">
                <h2>Budgets</h2>
                <button>See details</button>
            </div>
            <div className="budgets-overview">
                <PieChart budgetData={budgetData} transactions={transactions} className="doughnut" isSmall={true} />
                <div className="budget-info">
                    <div className="one-info">
                        <p>Entertainment</p>
                        <h4>$2,000.00</h4>
                    </div>
                    <div className="one-info">
                        <p>Bills</p>
                        <h4>$2,444.00</h4>
                    </div>
                    <div className="one-info">
                        <p>Dining Out</p>
                        <h4>$2,300.00</h4>
                    </div>
                    <div className="one-info">
                        <p>Personal Care</p>
                        <h4>$2,000.00</h4>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>)
}