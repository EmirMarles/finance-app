import './HomePage.css'
import { SideBar } from "../../components/SideBar"
import { PotsHomePage } from './PotsHomePage'
import { BudgetHomePage } from './BudgetHomePage'
import { TransHomePage } from './TransHomePage'
import { RecurringHomePage } from './RecurringHomePage'
import { useAuth } from '../../customHooks/useAuth'
import { useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient'
import { useWindowWidth } from '../../customHooks/useWindowWidth'
import { TABLET_WIDTH } from '../../consts/windowWidth'

export function HomePage({ chosenTab, setChosenTab, moneyData }) {

    const [balance, setBalance] = useState([])
    const [pots, setPots] = useState([])
    const [transactions, setTransactions] = useState([])
    const [budgets, setBudgets] = useState([])
    const [loadingBalance, setLoadingBalance] = useState(true)

    const { user } = useAuth();

    const width = useWindowWidth();

    useEffect(() => {
        console.log('width: ', width)
    }, [width])

    useEffect(() => {
        try {
            if (balance.length > 0) return
            const getBalance = async () => {
                const response = await apiClient.get(`/api/crud/balance/${user._id}`)
                if (response) {
                    setBalance(response.data);
                    setLoadingBalance(false)
                }
            }
            getBalance();
        } catch (err) {
            console.log(err.message)
        }
    }, [user._id, balance.length])

    useEffect(() => {
        try {
            if (transactions.length > 0) return
            const getTransactions = async () => {
                const response = await apiClient.get(`/api/crud/transactions/${user._id}`)
                if (response) {
                    setTransactions(response.data)
                }
            }
            getTransactions();
        } catch (err) {
            console.log(err.message)
        }
    }, [transactions, user._id])

    useEffect(() => {
        try {
            if (budgets.length > 0) return
            const getBudgetsFromApi = async () => {
                const response = await apiClient.get(`/api/crud/budgets/${user._id}`)
                if (response) {
                    console.log('budgets', response.data)
                    setBudgets(response.data)
                }
            }
            getBudgetsFromApi();
        } catch (err) {
            console.log(err.message)
        }
    }, [user._id, budgets])

    useEffect(() => {
        try {
            if (pots.length > 0) return
            const getPotsFromApi = async () => {
                const response = await apiClient.get(`/api/crud/pots/${user._id}`)
                if (response) {
                    console.log('pots', response.data)
                    setPots(response.data)
                }
            }
            getPotsFromApi();
        } catch (err) {
            console.log(err.message)
        }
    }, [user._id, pots])


    return (
        <div className="home-page-desktop">
            {width > TABLET_WIDTH
                && <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            }
            <div className="home-page">
                <h2 className='page-header'>Overview</h2>
                <div className="grid-cards">
                    <div className="card">
                        <p>Current Balance</p>
                        <h1> {loadingBalance
                            ? <span>Loading...</span>
                            : <span>${balance.current}</span>}
                        </h1>
                    </div>
                    <div className="card white-card">
                        <p>Income</p>
                        <h1>{loadingBalance
                            ? <span>Loading...</span>
                            : <span>${balance.income}</span>}</h1>
                    </div>
                    <div className="card white-card">
                        <p>Expenses</p>
                        <h1>{loadingBalance
                            ? <span>Loading...</span>
                            : <span>${balance.expenses}</span>}</h1>
                    </div>
                </div>
                <div className="bento-grid">
                    <PotsHomePage className="bento-element" loadingBalance={loadingBalance} setChosenTab={setChosenTab} pots={pots}></PotsHomePage>
                    <BudgetHomePage className="bento-element" loadingBalance={loadingBalance} setChosenTab={setChosenTab} budgets={budgets} moneyData={moneyData}></BudgetHomePage>
                    <TransHomePage className="bento-element" loadingBalance={loadingBalance} setChosenTab={setChosenTab} transactions={transactions} moneyData={moneyData} ></TransHomePage>
                    <RecurringHomePage className="bento-element" loadingBalance={loadingBalance} setChosenTab={setChosenTab} transactions={transactions} moneyData={moneyData}></RecurringHomePage>
                </div>
                {width < TABLET_WIDTH
                    && <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
                }
            </div>
        </div>
    )
}