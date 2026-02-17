import './TransHomePage.css'
import { TransactionsBoard } from './Transactions/TransactionsBoard'

export function TransHomePage({ moneyData, chosenTab, setChosenTab }) {
    const transactions = moneyData.transactions
    return (
        <div className="b transactions" style={{ gridArea: 'box3' }}>
            <TransactionsBoard transactions={transactions}></TransactionsBoard>
        </div>
    )
}
