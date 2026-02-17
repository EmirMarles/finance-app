import './RecurringBills.css'
import { SideBar } from '../../components/SideBar'
import { RecurringList } from './RecurringList'
import { getRecurringTransactions } from '../../utils/moneyDataManilpulation'

export function RecurringBills({ moneyData, chosenTab, setChosenTab }) {

    const recurringBillsData = getRecurringTransactions(moneyData)
    
    return (
        <div className="recurring-bills">
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="recurring-main">
                <div className="recurring-header">
                    <h4>Recurring Bills</h4>
                    <button>Add New Recurring Bill</button>
                </div>

                <div className="recurring-grid">
                    <div className="total">
                        <div className="total-bills">
                            <h5>Total Recurring Bills</h5>
                            <h5>3</h5>
                        </div>
                        <div className="summary">
                            <h5>Summary</h5>
                            <p>3 bills due in the next 7 days</p>
                        </div>
                    </div>
                    <div className="recurring-bills-list">
                        <RecurringList recurringBillsData={recurringBillsData}></RecurringList>
                    </div>
                </div>
            </div>
        </div>
    )
}