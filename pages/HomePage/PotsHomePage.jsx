import './PotsHomePage.css'
import IconPot from '../../public/assets/images/icon-pot.svg?react'
import IconCaretRight from '../../public/assets/images/icon-caret-right.svg?react'
import { useNavigate } from 'react-router-dom'

export function PotsHomePage({ setChosenTab, pots }) {

    const firstFourPots = pots.slice(0, 4)
    const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0)

    const navigate = useNavigate()

    const handleNavigateToPots = () => {
        navigate('/pots')
        setChosenTab('/pots')
        window.scrollTo({ top: 0 })
        localStorage.setItem('tab', JSON.stringify('/pots'))
    }
    return (
        <div className="b pots" style={{ gridArea: 'box1' }}>
            <div className="pots-header-home">
                <h3 className='pot-hh'>Pots</h3>
                <button className='btn-nav' onClick={handleNavigateToPots}>See details<IconCaretRight className="icon-caret-right"></IconCaretRight></button>
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
                                <div className="color-col" style={{ "--pot-home-color": pot.theme }}></div>
                                <div>
                                    <p>{pot.name}</p>
                                    <p>${pot.total}</p>
                                </div>
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