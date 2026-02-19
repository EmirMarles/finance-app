import './Pots.css';
import { SideBar } from '../../components/SideBar';
import { OnePot } from './OnePot';
import { useState } from 'react';
import { AddPot } from './AddPot';

export function Pots({ moneyData, chosenTab, setChosenTab }) {

    const potsData = moneyData.pots

    const [showAddPotForm, setShowAddPotForm] = useState(false)
    const [potsButton, setPotsButton] = useState({
        action: 'add',
        show: false
    })

    const togglePotsButtonAdd = (action) => {
        setPotsButton({
            action: action,
            show: !potsButton.show
        })
    }

    const toggleAddPotForm = () => {
        console.log('clicked')
        setShowAddPotForm(!showAddPotForm)
    }

    return (
        <div className="pots-page">
            <SideBar moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="main-pots">
                <div className="pots-header">
                    <h4>Pots</h4>
                    <button onClick={() => togglePotsButtonAdd('add')}>Add New Pot</button>
                </div>
                <div className="pots-grid">
                    {Array.isArray(potsData) && potsData.length > 0 &&
                        potsData.map((pot, index) => {
                            return <OnePot potsButton={potsButton} setPotsButton={setPotsButton} key={index} potData={pot}></OnePot>
                        })
                    }
                </div>
                {showAddPotForm &&
                    <div className="add-pot-form-show">
                        <AddPot></AddPot>
                    </div>
                }
            </div>
            {potsButton.show &&
                <AddPot potsButton={potsButton} setPotsButton={setPotsButton}></AddPot>
            }
        </div >
    )
}
