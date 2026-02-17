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
                <h2>Overview</h2>
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
                    {/* <div className="b pots" style={{ gridArea: 'box1' }}>
                        <div className="pots-header">
                            <h4>Pots</h4>
                            <button>See details</button>
                        </div>
                        <div className="pots-data">
                            <div className="total-saved-info">
                                <IconPot></IconPot>
                                <div className='data'>
                                    <p>Total Saved</p>
                                    <h1>$1,200.00</h1>
                                </div>
                            </div>
                            <div className="pot-data">
                                <div className='o-pot'>
                                    <p>Savings</p>
                                    <p>$149</p>
                                </div>
                                <div className='o-pot'>
                                    <p>Gift</p>
                                    <p>$14</p>
                                </div>
                                <div className='o-pot'>
                                    <p>New Laptop</p>
                                    <p>$19</p>
                                </div>
                                <div className='o-pot'>
                                    <p>Concert Ticket</p>
                                    <p>$1999</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <BudgetHomePage></BudgetHomePage>
                    <TransHomePage moneyData={moneyData} ></TransHomePage>
                    <RecurringHomePage></RecurringHomePage>
                </div>
            </div>
        </div>
    )
}