import './HomePage.css'
import { SideBar } from "../components/SideBar"
import IconPot from '../public/assets/images/icon-pot.svg?react'
import { PotsHomePage } from './PotsHomePage'
import { BudgetHomePage } from './BudgetHomePage'
import { TransHomePage } from './TransHomePage'
import { RecurringHomePage } from './RecurringHomePage'

export function HomePage({ chosenTab, setChosenTab, moneyData }) {
    return (
        <div className="home-page-desktop">
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="home-page">
                <h2 className='overview'>Overview</h2>
                <div className="grid-cards">
                    <div className="card">
                        <p>Current Balance</p>
                        <h1>$900.00</h1>
                    </div>
                    <div className="card white-card">
                        <p>Income</p>
                        <h1>$1,700.00</h1>
                    </div>
                    <div className="card white-card">
                        <p>Expenses</p>
                        <h1>$1,500.00</h1>
                    </div>
                </div>
                <div className="bento-grid">
                    <PotsHomePage></PotsHomePage>
                    <BudgetHomePage moneyData={moneyData}></BudgetHomePage>
                    <TransHomePage moneyData={moneyData} ></TransHomePage>
                    <RecurringHomePage></RecurringHomePage>
                </div>
            </div>
        </div>
    )
}