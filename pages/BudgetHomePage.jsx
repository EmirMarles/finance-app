import './BudgetHomePage.css'
import { PieChart } from './Budgets/PieChart'
import IconCaretRight from '../public/assets/images/icon-caret-right.svg?react'

export function BudgetHomePage({ budgets, moneyData }) {

    const transactions = moneyData.transactions
    const budgetData = budgets

    return (
        <div className="b budgets" style={{ gridArea: 'box2' }}>
            {/* <div className="doughnut"> */}
            <div className="budgets-header-home">
                <h2>Budgets</h2>
                <button >See details<IconCaretRight className="icon-caret-right"></IconCaretRight></button>
            </div>
            <div className="budgets-overview">
                <PieChart budgetData={budgetData} transactions={transactions} className="doughnut" isSmall={true} />
                <div className="budget-info">
                    {Array.isArray(budgetData) && budgetData.length > 0 &&
                        budgetData.map((budget, index) => {
                            return <div key={index} className="one-info" style={{"--color-themes-bud" : budget.theme}}>
                                <p>{budget.category}</p>
                                <h4>${budget.maximum}</h4>
                            </div>
                        })}
                </div>
            </div>
        </div>)
}