import { OneTransaction } from "./OneTransaction"
import './TransactionsBoard.css'
import './MiniBoard.css'
import { formatTime } from '../../utils/Helper'
import { addDollarSign } from '../../utils/moneyDataManilpulation'

export function MiniBoard({ transactions }) {

    const currentTransactions = transactions.slice(0, 5)

    return (
        <div className='board'>
            <div className="transactions-table">
                <div className="transactions-rows-mini">
                    {Array.isArray(currentTransactions) &&
                        currentTransactions.map((transaction, index) => {
                            return <div className='one-board-transaction-mini'>
                                <div className="sender-rec">
                                    <img src={transaction.avatar} alt="avatar picture" />
                                    <p>{transaction.name}</p>
                                </div>
                                <div className="transaction-amount-mini">
                                    {transaction.amount > 400
                                        ? <p className='trans-data lots-money'>{addDollarSign(transaction.amount)}</p>
                                        : <p className='trans-data money'>{addDollarSign(transaction.amount)}</p>
                                    }
                                    <p className='trans-data'>{formatTime(transaction.date)}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}