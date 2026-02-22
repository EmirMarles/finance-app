import './AddMoney.css'
import IconClose from '../../public/assets/images/icon-close-modal.svg?react'

export function AddMoney({ showAddMoneyButton, setShowAddMoneyButton }) {

    const handleCloseWindow = () => {
        setShowAddMoneyButton(prev => ({
            ...prev,
            show: false
        }))
    }

    const action = showAddMoneyButton.action

    const handleWithdraw = () => {
        console.log('withdraw')
    }

    const handleAdd = () => {
        console.log('add')
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
                    <h2>345.00</h2>
                </div>
                {
                    action === 'add'
                        ? <progress value={27.5} max={100}></progress>
                        : <progress value={27.5} max={100}></progress>
                }
                <div className="target-pot">
                    <p>27.5%</p>
                    <p>Target of $2.000</p>
                </div>
            </div>

            <div className="amount-to-add">
                {
                    action === 'add'
                        ? <p>Amount to add</p>
                        : <p>Amount to withdraw</p>
                }

                <input type="text" placeholder='$400' />
            </div>
            {
                action === 'add'
                    ? <button className='confirm-button-pot'>Confirm Addition</button>
                    : <button className='confirm-button-pot'>Confirm Withdrawal</button>
            }
        </div>
    )
}