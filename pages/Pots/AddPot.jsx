import './AddPot.css'
import CloseSign from '../../public/assets/images/icon-close-modal.svg?react'
import { useState } from 'react'
import { themes } from '../../consts/thems'
import IconCaretDown from '../../public/assets/images/icon-caret-down.svg?react'

export function AddPot({ potsButton, setPotsButton }) {

    const [newPotData, setNewPotData] = useState([])
    const [themeOptions, setThemeOptions] = useState(false)

    const handleClose = () => {
        setPotsButton(prev => ({
            ...prev,
            show: false
        }))
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
                            <input type="text" name="" id="" />
                        </div>
                        <div className="one-in">
                            <p>Target</p>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="one-in">
                            <p>Theme</p>
                            <div className='theme-options-theme' onClick={() => setThemeOptions(!themeOptions)}>
                                {/* <div className="inner-theme"> */}
                                <div className="color-container">
                                    <div className="color-theme" style={{ "--theme-choosing-color": themes[0].theme }}></div>
                                    <p>{themes[0].color}</p>
                                    {/* </div> */}
                                    <IconCaretDown className='icon-caret' ></IconCaretDown>
                                </div>
                                {themeOptions &&
                                    themes.length > 0 &&
                                    themes.map((theme, index) => {
                                        return <div key={index} className='one-theme'>
                                            <div className="not-used">
                                                <div className="color-theme" style={{ "--theme-choosing-color": theme.theme }}></div>
                                                <p>{theme.color}</p>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
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