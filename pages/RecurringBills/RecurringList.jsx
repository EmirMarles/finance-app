import './RecurringList.css'
import { formatTimeForRecurring } from '../../utils/Helper'

export function RecurringList({ recurringBillsData }) {
    return (
        <div className="recurring-list">
            <div className="list-header">
                <div className="searc-list">
                    Search
                </div>
                <div className="sort-by">
                    Sort by
                    <button>Latest</button>
                </div>
            </div>
            <div className="list-of-recurring">
                {Array.isArray(recurringBillsData) && recurringBillsData.length > 0 &&
                    recurringBillsData.map((bill, index) => {
                        return <div key={index} className="one-recurring-bill">
                            <div className="bill-name">
                                <img src={bill.avatar} alt="avatar" className="avatar" />
                                <h5>{bill.name}</h5>
                            </div>
                            <div className="due-date">
                                <p>Monthly {formatTimeForRecurring(bill.date)}</p>
                            </div>
                            <div className="bill-amount">
                                <h5>${bill.amount}</h5>
                            </div>
                        </div>
                    })}
            </div>
        </div>
    )
}