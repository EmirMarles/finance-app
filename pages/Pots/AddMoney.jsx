import './AddMoney.css'
import IconClose from '../../public/assets/images/icon-close-modal.svg?react'
import apiClient from '../../utils/apiClient'
import { useState } from 'react'

export function AddMoney({ showAddMoneyButton, setShowAddMoneyButton }) {

    const [amount, setAmount] = useState(null)

    const handleCloseWindow = () => {
        setShowAddMoneyButton(prev => ({
            ...prev,
            show: false
        }))
    }

    const action = showAddMoneyButton.action
    const pot = showAddMoneyButton.onePotData;

    const percentage = pot.total / pot.target * 100

    const handleAddAmount = (e) => {
        const numeric = e.target.value.replace(/\D/g, "")
        setAmount(Number(numeric))
    }


    const handleWithdrawMoney = () => {
        if (amount >= pot.total) {
            console.log('not possible to withdraw')
            return
        }

        const withdrawMoney = async () => {
            try {
                let newPotObj = { ...pot }
                newPotObj.total = newPotObj.total - amount
                const response = await apiClient.put('',
                    newPotObj)
                if (response.status === 200) {
                    console.log('')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleAddMoney = () => {
        let newPotObj = { ...pot }
        newPotObj.total = newPotObj.total + amount
        console.log('new obj:', newPotObj)

        const addMoney = async () => {
            try {
                let newPotObj = { ...pot }
                newPotObj.total = newPotObj.total + amount
                const response = await apiClient.put('',
                    newPotObj)
                if (response.status === 200) {
                    console.log('')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

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