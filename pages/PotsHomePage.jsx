import './PotsHomePage.css'
import IconPot from '../public/assets/images/icon-pot.svg?react'
import IconCaretRight from '../public/assets/images/icon-caret-right.svg?react'
import { useEffect } from 'react'

export function PotsHomePage({ pots }) {

    const firstFourPots = pots.slice(0, 4)
    const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0)


    useEffect(()=>{
        console.log('pots in pots home page', pots)
    })

    return (
        <div className="b pots" style={{ gridArea: 'box1' }}>
            <div className="pots-header">
                <h4>Pots</h4>
                <button>See details<IconCaretRight className="icon-caret-right"></IconCaretRight></button>
            </div>
            <div className="pots-data">
                <div className="total-saved-info">
                    <IconPot></IconPot>
                    <div className='data'>
                        <p>Total Saved</p>
                        <h1>${totalSaved}</h1>
                    </div>
                </div>
                <div className="pot-data">
                    {Array.isArray(firstFourPots) && firstFourPots.length > 0 ? (
                        firstFourPots.map((pot, index) => (
                            <div key={index} className='o-pot' style={{ "--pot-home-color": pot.theme }}>
                                <p>{pot.name}</p>
                                <p>${pot.total}</p>
                            </div>
                        ))
                    ) : (
                        <p>No pots available</p>
                    )}
                </div>
            </div>
        </div>
    )
}