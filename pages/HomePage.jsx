import './HomePage.css'
import { SideBar } from "../components/SideBar"
import IconPot from '../public/assets/images/icon-pot.svg?react'
import { PotsHomePage } from './PotsHomePage'
import { BudgetHomePage } from './BudgetHomePage'
import { TransHomePage } from './TransHomePage'
import { RecurringHomePage } from './RecurringHomePage'
import { useEffect } from 'react'

export function HomePage({ chosenTab, setChosenTab, moneyData }) {

    const balance = moneyData.balance
    const pots = moneyData.pots
    const transactions = moneyData.transactions
    const budgets = moneyData.budgets

    useEffect(() => {
        console.log('pots', pots)
    }, [pots])

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