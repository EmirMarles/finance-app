import './TransHomePage.css'
import { TransactionsBoard } from './Transactions/TransactionsBoard'
import { MiniBoard } from './Transactions/MiniBoard'
import IconCaretRight from '../public/assets/images/icon-caret-right.svg?react'

export function TransHomePage({ transactions, moneyData}) {
    const firstFiveTrans = transactions.slice(0, 5)

    return (
        <div className="b transactions-board" style={{ gridArea: 'box3' }}>
            <div className='b-header'>
                <h3>Transactions</h3>
                <button >See All<IconCaretRight className="icon-caret-right"></IconCaretRight></button>
            </div>
            <MiniBoard transactions={firstFiveTrans}></MiniBoard>
        </div>
    )
}
