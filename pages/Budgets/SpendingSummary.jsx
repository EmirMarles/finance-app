import './SpendingSummary.css'
import { calculateMoneySpentOnCategory, calculateLimit } from '../../utils/helper'
import { PieChart } from './PieChart'
import { LoadingIcon } from '../../components/LoadingIcon'
import { useMemo } from 'react'

export function SpendingSummary({ loading, budgetData, transactions }) {

    const limit = useMemo(()=> calculateLimit(budgetData), [budgetData]) 

    return (
        <div className="spending-summary width-big">
            {loading
                ? <div className='loading-state'><LoadingIcon></LoadingIcon></div> 
                : <>
                    <div className="pie-chart">
                        <PieChart budgetData={budgetData} transactions={transactions} limit={limit} />
                    </div>

                    <div className="summary-text">
                        <h4>Spending Summary</h4>
                        <div className="spendings">
                            {Array.isArray(budgetData) && budgetData.length > 0 &&
                                budgetData.map((budget, index) => {
                                    return <div key={index} className='budget-category'
                                        style={{ "--theme-budget": budget.theme }}
                                    >
                                        <div className="budget-st">
                                            <div className='big'>
                                                <div className="color-bud"></div>
                                                <p>{budget.category}</p>
                                            </div>
                                        </div>
                                        <div className="budget-spent">
                                            <p><span className='spent-mon'>${calculateMoneySpentOnCategory(budget.category, transactions)}</span> <span className='max'>of ${budget.maximum}</span></p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </>}
        </div>
    )
}