import './SideBar.css'
import Logo from '../public/assets/images/logo-large.svg?react'
import LogoMini from '../public/assets/images/logo-small.svg?react'

import HomeIcon from '../public/assets/images/icon-nav-overview.svg?react'
import BudjetIcon from '../public/assets/images/icon-nav-budgets.svg?react'
import PotsIcon from '../public/assets/images/icon-nav-pots.svg?react'
import RecurringIcon from '../public/assets/images/icon-nav-recurring-bills.svg?react'
import TransactionsIcon from '../public/assets/images/icon-nav-transactions.svg?react'
import MinimizeIcon from '../public/assets/images/icon-minimize-menu.svg?react'


import { useWindowWidth } from '../customHooks/useWindowWidth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../customHooks/useAuth'

export function SideBar({ chosenTab, setChosenTab }) {

    const [isMinimized, setIsMinimized] = useState(false)
    const navigate = useNavigate();

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized)
    }

    const setTab = (tab) => {
        setChosenTab(tab)
        navigate(tab)
    }

    const width = useWindowWidth()

    const { logout } = useAuth()
    const handleLogout = () =>{
        logout()
    }

    if (!isMinimized) {
        return (
            <div className="sidebar-desktop">
                <div className="logo">
                    <Logo></Logo>
                </div>
                <div className="nav-bar">
                    <div className={`nav-bar-element ${chosenTab === '/' ? 'chosen-element' : ''}`} onClick={() => setTab('/')}>
                        <HomeIcon className={chosenTab === '/' ? 'chosen' : ''}></HomeIcon>
                        <p>Overview</p>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/transactions' ? 'chosen-element' : ''}`} onClick={() => setTab('/transactions')}>
                        <TransactionsIcon className={chosenTab === '/transactions' ? 'chosen' : ''}></TransactionsIcon>
                        <p>Transactions</p>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/budgets' ? 'chosen-element' : ''}`} onClick={() => setTab('/budgets')}>
                        <BudjetIcon className={chosenTab === '/budgets' ? 'chosen' : ''}></BudjetIcon>
                        <p>Budgets</p>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/pots' ? 'chosen-element' : ''}`} onClick={() => setTab('/pots')}>
                        <PotsIcon className={chosenTab === '/pots' ? 'chosen' : ''}></PotsIcon>
                        <p>Pots</p>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/recurring-bills' ? 'chosen-element' : ''}`} onClick={() => setTab('/recurring-bills')}>
                        <RecurringIcon className={chosenTab === '/recurring-bills' ? 'chosen' : ''}></RecurringIcon>
                        <p>Recurring bills</p>
                    </div>
                </div>

                <div className="minimize nav-bar-element" onClick={toggleMinimize}>
                    <MinimizeIcon></MinimizeIcon>
                    <p>Minimize Menu</p>
                </div>

                <div className="log-out">
                    <button className="logout-btn" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>
        )
    }

    if (isMinimized) {
        return (
            <div className="sidebar-desktop-minimized">
                <div className="logo">
                    <LogoMini></LogoMini>
                </div>
                <div className="nav-bar">
                    <div className={`nav-bar-element ${chosenTab === '/home' ? 'chosen-element' : ''}`} onClick={() => setTab('/home')}>
                        <HomeIcon className={chosenTab === '/home' ? 'chosen' : ''}></HomeIcon>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/transactions' ? 'chosen-element' : ''}`} onClick={() => setTab('/transactions')}>
                        <TransactionsIcon className={chosenTab === '/transactions' ? 'chosen' : ''}></TransactionsIcon>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/budget' ? 'chosen-element' : ''}`} onClick={() => setTab('/budget')}>
                        <BudjetIcon className={chosenTab === '/budget' ? 'chosen' : ''}></BudjetIcon>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/pots' ? 'chosen-element' : ''}`} onClick={() => setTab('/pots')}>
                        <PotsIcon className={chosenTab === '/pots' ? 'chosen' : ''}></PotsIcon>
                    </div>
                    <div className={`nav-bar-element ${chosenTab === '/recurring' ? 'chosen-element' : ''}`} onClick={() => setTab('/recurring')}>
                        <RecurringIcon className={chosenTab === '/recurring' ? 'chosen' : ''}></RecurringIcon>
                    </div>
                </div>

                <div className="minimize nav-bar-element" onClick={toggleMinimize}>
                    <MinimizeIcon></MinimizeIcon>
                </div>
            </div>
        )
    }
}