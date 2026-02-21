import './AddMoney.css'
import IconClose from '../../public/assets/images/icon-close-modal.svg?react'

export function AddMoney({ showAddMoneyButton }) {

    const handleCloseWindow = () => {
        return
    }

    return (
        <div className='add-money-pot'>
            <div className="money-header">
                <h2>Add to 'Savings'</h2>
                <IconClose></IconClose>
            </div>
            <p className='sub-money'>Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.</p>
            <div className="pot-info">
                <div className="pot-info-fr">
                    <p className="sub-money">
                        New Amount
                    </p>
                    <h2>345.00</h2>
                </div>
                <progress value={27.5} max={100}></progress>
                <div className="target-pot">
                    <p>27.5%</p>
                    <p>Target of $2.000</p>
                </div>
            </div>

            <div className="amount-to-add">
                <p>Amount to add</p>
                <input type="text" placeholder='$400' />
            </div>
            <button className='confirm-button'>Confirm Addition</button>
        </div>
    )
}