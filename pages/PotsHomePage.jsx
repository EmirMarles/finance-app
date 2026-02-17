import './PotsHomePage.css'
import IconPot from '../public/assets/images/icon-pot.svg?react'

export function PotsHomePage({ moneyData, chosenTab, setChosenTab }) {
    return (
        <div className="b pots" style={{ gridArea: 'box1' }}>
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
        </div>
    )
}