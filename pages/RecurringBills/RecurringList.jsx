import './RecurringList.css'

export function RecurringList({ recurringBillsData }) {
    return (
        <div className="recurring-list">
            <div className="list-haeder">
                <div className="searc-list">
                    Search
                </div>
                <div className="sort-by">
                    Sort by
                </div>
            </div>
            <div className="list-of-recurring">
                {Array.isArray(recurringBillsData) && recurringBillsData.length > 0 &&
                    recurringBillsData.map((bill, index) => {
                        return <div key={index} className="one-recurring-bill">
                            <div className="bill-name">
                                <h5>{bill.name}</h5>
                                <p>{bill.category}</p>
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