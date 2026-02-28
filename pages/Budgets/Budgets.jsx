import './Budgets.css'
import { SideBar } from '../../components/SideBar'
import { SpendingSummary } from './SpendingSummary'
import { OneBudget } from './OneBudget'
import { useState } from 'react'
import { AddBudget } from './AddBudget'
import { useEffect } from 'react'
import { useAuth } from '../../customHooks/useAuth'
import apiClient from '../../utils/apiClient'
import { LoadingContainer } from '../../components/LoadingContainer'
import { AddLoading } from '../../components/AddLoading'

import { useWindowWidth } from '../../customHooks/useWindowWidth'
import { TABLET_WIDTH } from '../../consts/windowWidth'

export function Budgets({ moneyData, chosenTab, setChosenTab }) {

    const [budgetData, setBudgetData] = useState([])
    const transactions = moneyData.transactions
    const [budgetButton, setBudgetButton] = useState({
        action: 'add',
        show: false,
        oneBudgetData: null
    })
    const [deleteBudget, setDeleteBudget] = useState(false)
    const [loading, setLoading] = useState(true)

    const [loadingAdd, setLoadingAdd] = useState(false)

    const { user } = useAuth();
    const width = useWindowWidth();

    useEffect(() => {
        if (budgetData.length > 0) return
        const getBudgets = async () => {
            setLoading(true)
            const response = await apiClient.get(`/api/crud/budgets/${user._id}`);
            if (response) {
                setBudgetData(response.data)
                setLoading(false)
            }
        }
        getBudgets();
    }, [user._id, budgetData.length])

    const toggleBudgetButtonAdd = (action) => {
        setBudgetButton({
            action: action,
            show: !budgetButton.show
        })
    }

    return (
        <div className='page-layout'>
            {
                width > TABLET_WIDTH
                && <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            }
            <div className="main-page-budgets">
                <div className="budgets-header">
                    <h2 className='page-header'>Budgets</h2>
                    <button className='btn-create-budget' onClick={() => toggleBudgetButtonAdd('add')}>Add New Budget</button>
                </div>
                <div className="budget-dashboard">
                    <SpendingSummary budgetData={budgetData} transactions={transactions} />
                    <div className="budgets-column">
                        {loading
                            ? <LoadingContainer></LoadingContainer>
                            : <>{Array.isArray(budgetData) && budgetData.length > 0
                                ? budgetData.map((budget, index) => {
                                    return <OneBudget key={index} budgetButton={budgetButton} setBudgetButton={setBudgetButton} OneBudgetData={budget} transactions={transactions} deleteBudget={deleteBudget} setDeleteBudget={setDeleteBudget} />
                                })
                                :
                                <div className='no-budget-data'>
                                    <h1>No Budgets!</h1>
                                    <p>Try adding by clicking 'Add new Budget'</p>
                                </div>
                            }</>}
                    </div>
                </div>
                {width < TABLET_WIDTH
                    && <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
                }
            </div>
            {budgetButton.show &&
                <AddBudget setLoadingAdd={setLoadingAdd} setBudgetData={setBudgetData} budgetData={budgetData} budgetButton={budgetButton} setBudgetButton={setBudgetButton}></AddBudget>
            }
            {loadingAdd && <AddLoading></AddLoading> }
        </div>
    )
}