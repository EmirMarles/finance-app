import './AddMoney.css'
import IconClose from '../../public/assets/images/icon-close-modal.svg?react'
import apiClient from '../../utils/apiClient'
import { useState } from 'react'
import { useAuth } from '../../customHooks/useAuth'

export function AddMoney({ setAddLoading, setPotsData, showAddMoneyButton, setShowAddMoneyButton }) {

    const [amount, setAmount] = useState(0)

    const { user } = useAuth()

    const getPots = async () => {
        try {
            const response = await apiClient.get(`/api/crud/pots/${user._id}`)
            if (response) {
                setPotsData(response.data)
                setAddLoading(false)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleAddAmount = (e) => {
        const numeric = e.target.value.replace(/\D/g, "")
        setAmount(Number(numeric))
    }

    const handleWithdrawMoney = () => {
        if (amount >= pot.total) {
            return
        }
        setShowAddMoneyButton(prev => ({
            ...prev,
            show: false
        }))
        setAddLoading(true)

        const withdrawMoney = async () => {
            try {
                const response = await apiClient.put(`/api/crud/pot/withdraw/${pot._id}`,
                    {
                        amount: amount
                    })
                if (response.status === 200) {
                    getPots();
                }
            } catch (err) {
                console.log(err)
            }
        }
        withdrawMoney();
    }

    const handleAddMoney = () => {
        setShowAddMoneyButton(prev => ({
            ...prev,
            show: false
        }))
        setAddLoading(true)
        const addMoney = async () => {
            try {
                const response = await apiClient.put(`/api/crud/pot/add/${pot._id}`,
                    {
                        amount: amount
                    })
                if (response.status === 200) {
                    getPots();
                }
            } catch (err) {
                console.log(err)
            }
        }
        addMoney();
    }

    const handleCloseWindow = () => {
        setShowAddMoneyButton(prev => ({
            ...prev,
            show: false
        }))
    }

    const action = showAddMoneyButton.action
    const pot = showAddMoneyButton.onePotData;
    const percentage = Math.floor(pot.total / pot.target * 100)

    return (
        <div className='add-money-pot'>
            <div className="money-header">
                {
                    action === 'add'
                        ? <h2>Add to 'Savings'</h2>
                        : <h2>Withdraw from 'Savings'</h2>
                }
                <IconClose onClick={handleCloseWindow}></IconClose>
            </div>
            {
                action === 'add'
                    ? <p className='sub-money'>Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.</p>
                    : <p className='sub-money'>Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.</p>
            }

            <div className="pot-info">
                <div className="pot-info-fr">
                    <p className="sub-money">
                        New Amount
                    </p>
                    <h2>${pot.total}</h2>
                </div>
                {
                    action === 'add'
                        ? <progress value={percentage} max={100}></progress>
                        : <progress value={percentage} max={100}></progress>
                }
                <div className="target-pot">
                    <p>{percentage}%</p>
                    <p>Target of ${pot?.target}</p>
                </div>
            </div>

            <div className="amount-to-add">
                {
                    action === 'add'
                        ? <p>Amount to add</p>
                        : <p>Amount to withdraw</p>
                }

                <input type="text" placeholder='$400' value={amount} onChange={handleAddAmount} />
            </div>
            {
                action === 'add'
                    ? <button className='confirm-button-pot' onClick={handleAddMoney}>Confirm Addition</button>
                    : <button className='confirm-button-pot' onClick={handleWithdrawMoney}>Confirm Withdrawal</button>
            }
        </div>
    )
}