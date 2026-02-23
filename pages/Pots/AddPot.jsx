import './AddPot.css'
import CloseSign from '../../public/assets/images/icon-close-modal.svg?react'
import { useState } from 'react'
import { themes } from '../../consts/thems'
import IconCaretDown from '../../public/assets/images/icon-caret-down.svg?react'
import { useAuth } from '../../customHooks/useAuth'

export function AddPot({ potsButton, setPotsButton }) {
    const { user }= useAuth();

    const [newPotData, setNewPotData] = useState({
        user: user._id,
        name: null,
        target: null,
        total: 0,
        theme: null
    })

    const [themeOptions, setThemeOptions] = useState(false)

    const handleClose = () => {
        setPotsButton(prev => ({
            ...prev,
            show: false
        }))
    }

    const handleSaveNewPotData = (e, field, update) => {
        switch (field) {
            case 'name':
                setNewPotData(prev => ({
                    ...prev,
                    name: e.target.value
                }))
                break;
            case 'target':
                setNewPotData(prev => ({
                    ...prev,
                    target: Number(e.target.value)
                }))
                break;
            case 'theme':
                setNewPotData(prev => ({
                    ...prev,
                    theme: update.theme
                }))
                break;
            default:
                break;
        }
    }

    const handleCreateNewPot = () => {
        console.log('New pot data:', newPotData)
        return
    }

    if (potsButton.action === 'add') {
        return (
            <div className='add-budget-container'>
                <div className="add-header">
                    <h2>Add New Pot</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
                <div className="budget-info">
                    <form action="">
                        <div className="one-in">
                            <p>Pot Name</p>
                            <input type="text" name="" id="" value={newPotData.name} onChange={(e) => { handleSaveNewPotData(e, 'name') }} />
                        </div>
                        <div className="one-in">
                            <p>Target</p>
                            <input type="text" name="" id="" onChange={(e)=> handleSaveNewPotData(e, 'target')} />
                        </div>
                        <div className="one-in">
                            <p>Theme</p>
                            <div className='theme-options-pot' onClick={() => setThemeOptions(!themeOptions)}>
                                {/* <div className="inner-theme"> */}
                                <div className="color-container-pot">
                                    <div className='sub-color-container'>
                                        <div className="color-theme" style={{ "--theme-choosing-color": newPotData.theme? newPotData.theme : themes[0].theme }}></div>
                                        <p>{newPotData.theme ? newPotData.theme : themes[0].color}</p>
                                    </div>
                                    {/* </div> */}
                                    <IconCaretDown className='icon-caret' ></IconCaretDown>
                                </div>
                                {themeOptions &&
                                    <div className="themes-chose">
                                        {themes.length > 0 &&
                                            themes.map((theme, index) => {
                                                return <div key={index} className='one-theme' onClick={(e) => handleSaveNewPotData(e, 'theme', theme)}>
                                                    <div className="not-used">
                                                        <div className="color-theme" style={{ "--theme-choosing-color": theme.theme }}></div>
                                                        <p>{theme.color}</p>
                                                    </div>
                                                </div>
                                            })}
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <button className="add-b" onClick={handleCreateNewPot}>
                    Add Pots
                </button>
            </div>
        )
    }

    else if (potsButton.action === 'edit') {
        return (
            <div className='add-budget-container'>
                <div className="add-header">
                    <h2>Edit Pot</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>If your saving targets change, feel free to update your pots.</p>
                <div className="budget-info">
                    <form action="">
                        <div className="one-in">
                            <p>Pot Name</p>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="one-in">
                            <p>Target</p>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="one-in">
                            <p>Theme</p>
                            <input type="text" name="" id="" />
                        </div>
                    </form>
                </div>
                <button className="add-b">
                    Add Pots
                </button>
            </div>
        )
    }

    else {
        return (
            <div className='add-budget-container delete'>
                <div className="add-header">
                    <h2>Delete 'Savings'?</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>
                    Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                <div className="button-delete">
                    <button className="red-b">
                        Yes, Confirm Deletion
                    </button>
                    <button>
                        No, Go Back
                    </button>
                </div>

            </div>
        )
    }
}