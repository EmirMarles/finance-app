import './SpendingSummary.css'
import { calculateMoneySpentOnCategory, calculateLimit } from '../../utils/Helper'

export function SpendingSummary({ budgetData, transactions }) {

    const limit = calculateLimit(budgetData)

    return (
        <div className="spending-summary">
            <div className="pie-chart">
                <p> of ${limit} limit</p>
            </div>

            <div className="summary">
                <h4>Spending Summary</h4>
                <div className="spendings">
                    {Array.isArray(budgetData) && budgetData.length > 0 &&
                        budgetData.map((budget) => {
                            return <div className='budget-category'
                                style={{ "--theme": budget.theme }}
                            >
                                <div className="budget-st">
                                    <p>{budget.category}</p>
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