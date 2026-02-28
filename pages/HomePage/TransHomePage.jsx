import './TransHomePage.css'
import { MiniBoard } from '../Transactions/MiniBoard'
import IconCaretRight from '../../public/assets/images/icon-caret-right.svg?react'
import { useNavigate } from 'react-router-dom'
import { LoadingContainer } from '../../components/LoadingContainer'

export function TransHomePage({ loadingBalance, setChosenTab, transactions }) {
    const firstFiveTrans = transactions.slice(0, 5)
    const navigate = useNavigate()
    const handleNavigateToTransactions = () => {
        navigate('/transactions')
        setChosenTab('/transactions')
        window.scrollTo({ top: 0 })
        localStorage.setItem('tab', JSON.stringify('/transactions'))
    }

    return (
        <div className="b transactions-board-mini" style={{ gridArea: 'box3' }}>
            <div className='b-header'>
                <h3 className='pot-hh'>Transactions</h3>
                <button className='btn-nav' onClick={handleNavigateToTransactions}>See All<IconCaretRight className="icon-caret-right"></IconCaretRight></button>
            </div>
            {loadingBalance
                ? <LoadingContainer></LoadingContainer>
                : <MiniBoard transactions={firstFiveTrans}></MiniBoard>
            }
        </div>
    )
}
