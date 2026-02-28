import './OnePot.css';
import IconEllipsis from '../../public/assets/images/icon-ellipsis.svg?react';
import { useState } from 'react';


export function OnePot({ setPotsButton, potData, setShowAddMoneyButton }) {

    const [openPotOptions, setOpenPotOptions] = useState(false)

    const toggleOpenPot = () => {
        setOpenPotOptions(!openPotOptions)
    }

    const handleOpenDeleteOption = (action) => {
        console.log(action)
        setOpenPotOptions(false)
        setPotsButton({
            action: action,
            show: true,
            onePotData: potData
        })
    }

    const handleOpenAddMoneyButton = (action) => {
        setShowAddMoneyButton({
            show: true,
            action: action,
            onePotData: potData
        })
    }

    const percentage = Math.floor((potData.total / potData.target) * 100)

    return (
        <div className="one-pot"
            style={{ "--pot-theme": potData.theme }}
        >
            <div className="pot-header">
                <div className="sub-header-pot">
                    <div className="color"></div>
                    <h3>{potData.name}</h3>
                </div>
                <div className="ellipsis-container" onClick={toggleOpenPot}>
                    <IconEllipsis  className="ellipsis"></IconEllipsis>
                    {openPotOptions &&
                        <div className="options-edit-delete">
                            <p className='option-edit' onClick={() => handleOpenDeleteOption('edit')}>Edit Pot</p>
                            <p className='option-edit' onClick={() => handleOpenDeleteOption('delete')}>Delete Pot</p>
                        </div>
                    }
                </div>
            </div>

            <div className="save-data">
                <div className="total-saved">
                    <h5>Total Saved</h5>
                    <h5>${potData.total}</h5>
                </div>
                <progress className="progress-pot" value={percentage} max={100}></progress>
                <div className="percentage">
                    <p>{percentage}%</p>
                    <p>Target of ${potData.target}</p>
                </div>
                <div className="buttons">
                    <button className='add-money' onClick={() => handleOpenAddMoneyButton('add')}>Add Money</button>
                    <button className="withdraw" onClick={() => handleOpenAddMoneyButton('withdraw')}>Withdraw</button>
                </div>
            </div>
        </div>
    )
}
