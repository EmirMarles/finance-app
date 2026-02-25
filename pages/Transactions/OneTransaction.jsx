import './OneTransaction.css'
import { formatTime } from '../../utils/Helper'
import { addDollarSign } from '../../utils/moneyDataManilpulation'

export function OneTransaction({ transaction }) {
    return (
        <div className='one-board-transaction'>
            <div className="sender-rec">
                <img src={transaction.avatar} alt="avatar picture" />
                <p>{transaction.name}</p>
            </div>
            <p className='trans-data one reduntant'>{transaction.category}</p>
            <p className='trans-data reduntant'>{formatTime(transaction.date)}</p>
            {transaction.amount > 400
                ? <p className='trans-data lots-money'>{addDollarSign(transaction.amount)}</p>
                : <p className='trans-data money'>{addDollarSign(transaction.amount)}</p>
            }
        </div>
    )
}