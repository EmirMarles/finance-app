import './Transactions.css'
import { SideBar } from "../../components/SideBar"
import { TransactionsBoard } from './TransactionsBoard'

export function Transactions({ moneyData, chosenTab, setChosenTab }) {
    // function to get the money data // 

    /// useAuth, useLogin, etc

    const transactions = moneyData.transactions

    return (
        <div className='transactions'>
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="transactions-page-layout">
                <h1>Transactions</h1>
                <TransactionsBoard transactions={transactions}></TransactionsBoard>
            </div>
        </div>
    )
}