import './SpendingSummary.css'
import { calculateMoneySpentOnCategory, calculateLimit } from '../../utils/Helper'
import { PieChart } from './PieChart'

export function SpendingSummary({ budgetData, transactions }) {

    const limit = calculateLimit(budgetData)

    return (
        <div className="spending-summary">
            <div className="pie-chart">
                <PieChart budgetData={budgetData} transactions={transactions} limit={limit} />
            </div>

            <div className="summary">
                <h4>Spending Summary</h4>
                <div className="spendings">
                    {Array.isArray(budgetData) && budgetData.length > 0 &&
                        budgetData.map((budget, index) => {
                            return <div key={index} className='budget-category'
                                style={{ "--theme-budget": budget.theme }}
                            >
                                <div className="budget-st">
                                    <div className='b'>
                                        <div className="color-bud"></div>
                                        <p>{budget.category}</p>
                                    </div>
                                    {/* <p>{budget.category}</p> */}
                                </div>
                                <div className="budget-spent">
                                    <p><span className='spent-mon'>${calculateMoneySpentOnCategory(budget.category, transactions)}</span> <span className='max'>of ${budget.maximum}</span></p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}