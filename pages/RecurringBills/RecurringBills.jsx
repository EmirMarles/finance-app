import './RecurringBills.css'
import { SideBar } from '../../components/SideBar'
import { RecurringList } from './RecurringList'
import { getRecurringTransactions } from '../../utils/moneyDataManilpulation'
import RecurringIcon from '../../public/assets/images/icon-nav-recurring-bills.svg?react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import apiClient from '../../utils/apiClient'
import { useAuth } from '../../customHooks/useAuth'

export function RecurringBills({ moneyData, chosenTab, setChosenTab }) {

    // getRecurringTransactions(moneyData.transactions)
    const [recurringBillsData, setRecurringBillsData] = useState([])
    // function to get total upcoming bills, total paid bills, total due soon bills, etc. from the recurringBillsData //
    const [billsData, setBillsData] = useState({
        upcomingBills: 0,
        paidBills: 0,
        dueSoonBills: 0
    })

    const { user } = useAuth();

    useEffect(() => {
        if (recurringBillsData.length > 0) return
        const getRecurringBills = async () => {
            try {
                const response = await apiClient.get(`/api/crud/recurring-bills/${user._id}`)
                if (response.status === 200) {
                    setRecurringBillsData(response.data)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getRecurringBills()
    }, [recurringBillsData])

    useEffect(() => {
        const getBillsDataInDepth = async () => {
            try {
                const response = await apiClient.get(`/api/crud/bills-info/${user._id}`)
                if (response.status === 200) {
                    setBillsData(response.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getBillsDataInDepth();
    }, [])

    const getTotalBills = () => {
        let total = 0

        recurringBillsData.forEach(bill => {
            total += bill.amount * (-1)
        })
        return total
    }


    return (
        <div className="recurring-bills">
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="recurring-main">
                <div className="recurring-header">
                    <h2>Recurring Bills</h2>
                </div>

                <div className="recurring-grid">
                    <div className="total">
                        <div className="total-bills">
                            <RecurringIcon className='recurring-icon'></RecurringIcon>
                            <h5>Total Bills</h5>
                            <h5>${getTotalBills()}</h5>
                        </div>
                        <div className="summary">
                            <h3>Summary</h3>
                            <div className="summary-grid">
                                <div className="paid">
                                    <p>Paid Bills</p>
                                    <p>${billsData.paidBills}</p>
                                </div>
                                <div className="paid">
                                    <p>Total Upcoming</p>
                                    <p>${billsData.upcomingBills}</p>
                                </div>
                                <div className="paid due-soon">
                                    <p>Due Soon</p>
                                    <p>${billsData.dueSoonBills}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recurring-bills-list">
                        <RecurringList recurringBillsData={recurringBillsData}></RecurringList>
                    </div>
                </div>
            </div>
        </div>
    )
}