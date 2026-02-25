import './HomePage.css'
import { SideBar } from "../components/SideBar"
import IconPot from '../public/assets/images/icon-pot.svg?react'
import { PotsHomePage } from './PotsHomePage'
import { BudgetHomePage } from './BudgetHomePage'
import { TransHomePage } from './TransHomePage'
import { RecurringHomePage } from './RecurringHomePage'
import { useAuth } from '../customHooks/useAuth'
import { useEffect, useState } from 'react'

import axios from 'axios'

export function HomePage({ chosenTab, setChosenTab, moneyData }) {

    const [balance, setBalance] = useState([])
    const [pots, setPots] = useState([])
    const [transactions, setTransactions] = useState([])
    const [budgets, setBudgets] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        if (balance.length > 0) return
        const getBalance = async () => {
            const response = await axios.get(`http://localhost:5000/api/crud/balance/${user._id}`)
            if (response) {
                setBalance(response.data);
                // need to save it locally to avoid the api calls
            }
        }
        getBalance();
    }, [user._id, balance.length])

    useEffect(() => {
        if (transactions.length > 0) return
        const getTransactions = async () => {
            const response = await axios.get(`http://localhost:5000/api/crud/transactions/${user._id}`)
            if (response) {
                // console.log('transactions from back', response.data)
                setTransactions(response.data)
            }
        }
        getTransactions()
    }, [transactions, user._id])

    useEffect(() => {
        if (budgets.length > 0) return
        const getBudgetsFromApi = async () => {
            const response = await axios.get(`http://localhost:5000/api/crud/budgets/${user._id}`)
            if (response) {
                console.log('budgets', response.data)
                setBudgets(response.data)
            }
        }
        getBudgetsFromApi();
    }, [user._id, budgets])


    useEffect(() => {
        if (pots.length > 0) return
        const getPotsFromApi = async () => {
            const response = await axios.get(`http://localhost:5000/api/crud/pots/${user._id}`)
            if (response) {
                console.log('pots', response.data)
                setPots(response.data)
            }
        }
        getPotsFromApi();
    }, [user._id, pots])


    useEffect(() => {
        console.log(moneyData)
    }, [moneyData])

    return (
        <div className="home-page-desktop">
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="home-page">
                <h2 className='overview'>Overview</h2>
                <div className="grid-cards">
                    <div className="card">
                        <p>Current Balance</p>
                        <h1>${balance.current}</h1>
                    </div>
                    <div className="card white-card">
                        <p>Income</p>
                        <h1>${balance.income}</h1>
                    </div>
                    <div className="card white-card">
                        <p>Expenses</p>
                        <h1>${balance.expenses}</h1>
                    </div>
                </div>
                <div className="bento-grid">
                    <PotsHomePage className="bento-element" pots={pots}></PotsHomePage>
                    <BudgetHomePage className="bento-element" budgets={budgets} moneyData={moneyData}></BudgetHomePage>
                    <TransHomePage className="bento-element" transactions={transactions} moneyData={moneyData} ></TransHomePage>
                    <RecurringHomePage className="bento-element" transactions={transactions} moneyData={moneyData}></RecurringHomePage>
                </div>
            </div>
        </div>
    )
}