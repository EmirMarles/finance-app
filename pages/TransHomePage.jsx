import './TransHomePage.css'
import { TransactionsBoard } from './Transactions/TransactionsBoard'
import { MiniBoard } from './Transactions/MiniBoard'

export function TransHomePage({ moneyData, chosenTab, setChosenTab }) {
    const transactions = moneyData.transactions
    return (
        <div className="b transactions-board" style={{ gridArea: 'box3' }}>
            <div className='b-header'>
                <h3>Transactions</h3>
                <button>See All</button>
            </div>
            <MiniBoard transactions={transactions}></MiniBoard>
        </div>
    )
}
