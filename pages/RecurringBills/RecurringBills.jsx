import './RecurringBills.css'
import { SideBar } from '../../components/SideBar'
import { RecurringList } from './RecurringList'
import { getRecurringTransactions } from '../../utils/moneyDataManilpulation'
import RecurringIcon from '../../public/assets/images/icon-nav-recurring-bills.svg?react'
import { useEffect } from 'react'

export function RecurringBills({ moneyData, chosenTab, setChosenTab }) {

    const recurringBillsData = getRecurringTransactions(moneyData.transactions)

    // function to get total upcoming bills, total paid bills, total due soon bills, etc. from the recurringBillsData //
    const getTotalUpcomingBills = () => {
        let total = 0

        // need to compare the current date with the bill date 

        recurringBillsData.forEach(bill => {
            const newDate = new Date();
            if (bill.date > newDate.toISOString()) {
                total += bill.amount * (-1)
            }
        })
        return total
    }

    useEffect(() => {
        const date = new Date().toString()

        const firstBillDate = recurringBillsData[0].date
        const day = date.split(' ')[2]

        const billDate = new Date(firstBillDate).toString()

        console.log('current date', date)
        console.log('first bill date', firstBillDate.toString())
        console.log('bill date', billDate)
        console.log('current day', day)
    })

    const getTotalPaidBills = () => {
        let total = 0;
        recurringBillsData.forEach(bill => {
            const newDate = new Date();
            if (bill.status > newDate.toISOString()) {
                total += bill.amount * (-1)
            }
        })
        return total
    }

    const getTotalDueSoonBills = () => {
        let total = 0;
        recurringBillsData.forEach(bill => {
            const newDate = new Date();
            const billDate = new Date(bill.date)
            const timeDiff = billDate.getTime() - newDate.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24);
            if (daysDiff > 0 && daysDiff <= 7) {
                total += bill.amount * (-1)
            }
        })
        return total
    }

    const getTotalBills = () => {
        let total = 0

        recurringBillsData.forEach(bill => {
            total += bill.amount * (-1)
        })
        return total
    }


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
                            <h5>${getTotalBills()}</h5>
                        </div>
                        <div className="summary">
                            <h3>Summary</h3>
                            <div className="summary-grid">
                                <div className="paid">
                                    <p>Paid Bills</p>
                                    <p>${getTotalPaidBills()}</p>
                                </div>
                                <div className="paid">
                                    <p>Total Upcoming</p>
                                    <p>${getTotalUpcomingBills()}</p>
                                </div>
                                <div className="paid due-soon">
                                    <p>Due Soon</p>
                                    <p>${getTotalDueSoonBills()}</p>
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