import './Transactions.css'
import { SideBar } from "../../components/SideBar"
import { TransactionsBoard } from './TransactionsBoard'
import { useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient'
import { useAuth } from '../../customHooks/useAuth'

export function Transactions({ moneyData, chosenTab, setChosenTab }) {

    const [transactions, setTransactions] = useState([])
    const { user } = useAuth();

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
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="transactions-page-layout">
                <h1>Transactions</h1>
                <TransactionsBoard transactions={transactions}></TransactionsBoard>
            </div>
        </div>
    )
}