import './RecurringBills.css'
import { SideBar } from '../../components/SideBar'
import { RecurringList } from './RecurringList'
import { getRecurringTransactions } from '../../utils/moneyDataManilpulation'
import RecurringIcon from '../../public/assets/images/icon-nav-recurring-bills.svg?react'

export function RecurringBills({ moneyData, chosenTab, setChosenTab }) {

    const recurringBillsData = getRecurringTransactions(moneyData.transactions)

    return (
        <div className="recurring-bills">
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="recurring-main">
                <div className="recurring-header">
                    <h2>Recurring Bills</h2>
                    <button>Add New Recurring Bill</button>
                </div>

                <div className="recurring-grid">
                    <div className="total">
                        <div className="total-bills">
                            <RecurringIcon className='recurring-icon'></RecurringIcon>
                            <h5>Total Bills</h5>
                            <h5>3</h5>
                        </div>
                        <div className="summary">
                            <h3>Summary</h3>
                            <div className="summary-grid">
                                <div className="paid">
                                    <p>Paid Bills</p>
                                    <p>$120.00</p>
                                </div>
                                <div className="paid">
                                    <p>Total Upcoming</p>
                                    <p>$120.00</p>
                                </div>
                                <div className="paid due-soon">
                                    <p>Due Soon</p>
                                    <p>$120.00</p>
                                </div>
                            </div>
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