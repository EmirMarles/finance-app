import './BudgetHomePage.css'
import { PieChart } from '../Budgets/PieChart'
import IconCaretRight from '../../public/assets/images/icon-caret-right.svg?react'
import { useNavigate } from 'react-router-dom'

export function BudgetHomePage({ budgets, moneyData }) {

    const transactions = moneyData.transactions
    const budgetData = budgets

    const navigate = useNavigate()

    const handleNavigateToBudgets = () => {
        navigate('/budgets')
    }

    return (
        <div className="b budgets" style={{ gridArea: 'box2' }}>
            {/* <div className="doughnut"> */}
            <div className="budgets-header-home">
                <h2>Budgets</h2>
                <button onClick={handleNavigateToBudgets}>See details<IconCaretRight className="icon-caret-right"></IconCaretRight></button>
            </div>
            <div className="budgets-overview">
                <PieChart budgetData={budgetData} transactions={transactions} className="doughnut" isSmall={true} />
                <div className="budget-info">
                    {Array.isArray(budgetData) && budgetData.length > 0 &&
                        budgetData.map((budget, index) => {
                            return <div key={index} className="one-info" style={{ "--color-themes-bud": budget.theme }}>
                                <div className="color-budget-left" style={{ "--color-themes-bud": budget.theme }}></div>
                                <div className='info-pie'>
                                    <p>{budget.category}</p>
                                    <h4>${budget.maximum}</h4>
                                </div>
                            </div>
                        })}
                </div>
            </div>
        </div>)
}