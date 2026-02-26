import './Transactions.css'
import { SideBar } from "../../components/SideBar"
import { TransactionsBoard } from './TransactionsBoard'
import { useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient'
import { useAuth } from '../../customHooks/useAuth'
import { TABLET_WIDTH } from '../../consts/windowWidth'
import { useWindowWidth } from '../../customHooks/useWindowWidth'

export function Transactions({ moneyData, chosenTab, setChosenTab }) {

    const [transactions, setTransactions] = useState([])
    const { user } = useAuth();
    const width = useWindowWidth()

    useEffect(() => {
        console.log('transactions in state:', transactions)
        if (transactions.length > 0) return
        const getTransactions = async () => {
            try {
                const response = await apiClient.get(`/api/crud/transactions/${user._id}`)
                if (response) {
                    console.log('response from back', response.data)
                    setTransactions(response.data)
                }
            } catch (err) {
                console.log(err.message)
            }
        }
        getTransactions();
    }, [transactions, user])

    return (
        <div className='transactions'>
            {width > TABLET_WIDTH
                && <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            }
            <div className="transactions-page-layout">
                <h1 className='page-header'>Transactions</h1>
                <TransactionsBoard transactions={transactions}></TransactionsBoard>
                {width < TABLET_WIDTH
                    && <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
                }
            </div>
        </div>
    )
}