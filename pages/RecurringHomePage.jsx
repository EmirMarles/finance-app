import './RecurringHomePage.css'

export function RecurringHomePage({ moneyData, chosenTab, setChosenTab }) {
    return (
        <div className="b recurring-bills-home" style={{ gridArea: 'box4' }}>
            <div className="bills-header">
                <h3>Recurring bills</h3>
                <button>See more</button>
            </div>
            <div className="bills-grid-home">
                <div className="first">
                    <p>Paid bills</p>
                    <h3>$120.00</h3>
                </div>
                <div className="first">
                    <p>Total Upcoming</p>
                    <h3>$120.00</h3>
                </div>
                <div className="first">
                    <p>Due Soon</p>
                    <h3>$45.00</h3>
                </div>
            </div>
        </div>
    )
}   