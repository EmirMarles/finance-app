import './RecurringHomePage.css'

export function RecurringHomePage({ moneyData, chosenTab, setChosenTab }) {
    return (
        <div className="b recurring-bills" style={{ gridArea: 'box4' }}>
            <div className="bills-header">
                <h3>Recurring bills</h3>
                <button>See more</button>
            </div>
            <div className="bills-grid-home">
                <div className="first">
                    first
                </div>
                <div className="first">
                    second
                </div>
                <div className="first">
                    third
                </div>
            </div>
        </div>
    )
}   