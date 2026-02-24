import './AddPot.css'
import CloseSign from '../../public/assets/images/icon-close-modal.svg?react'
import { useState, useEffect } from 'react'
import { themes } from '../../consts/thems'
import IconCaretDown from '../../public/assets/images/icon-caret-down.svg?react'
import { useAuth } from '../../customHooks/useAuth'
import axios from 'axios'
import apiClient from '../../utils/apiClient'
import { ErrMessage } from '../../components/ErrMessage'

export function AddPot({ setPotsData, potsButton, setPotsButton }) {
    const { user } = useAuth();

    const [newPotData, setNewPotData] = useState({
        // user: user._id,
        name: null,
        target: null,
        total: 0,
        theme: null
    })

    const [themeOptions, setThemeOptions] = useState(false)
    const [errMessage, setErrMessage] = useState({
        show: false,
        message: "Created Pot Succesfully"
    })

    useEffect(() => {
        if (errMessage.show === false) return
        const timeOut = setTimeout(() => {
            setErrMessage(prev => ({
                ...prev,
                show: false
            }))
        }, 1200)
        return () => clearTimeout(timeOut)
    }, [errMessage])

    const handleClose = () => {
        setPotsButton(prev => ({
            ...prev,
            show: false
        }))
    }

    const getPots = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/crud/pots/${user._id}`)
            if (response) {
                setPotsData(response.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleSaveNewPotData = (e, field, update) => {
        switch (field) {
            case 'name': {
                setNewPotData(prev => ({
                    ...prev,
                    name: e.target.value
                }))
                break;
            }
            case 'target': {
                const numericValue = e.target.value.replace(/\D/g, "")
                setNewPotData(prev => ({
                    ...prev,
                    target: Number(numericValue)
                }))
                break;
            }
            case 'theme': {
                setNewPotData(prev => ({
                    ...prev,
                    theme: update.theme
                }))
                break;
            }
            default:
                break;
        }
    }

    const handleCreateNewPot = () => {
        const createPot = async () => {
            try {
                setPotsButton(prev => ({
                    ...prev,
                    show: false
                }))
                const response = await axios.post(`http://localhost:5000/api/crud/create-pot/${user._id}`,
                    newPotData
                )
                if (response.status === 201) {

                    getPots();
                }
            }
            catch (err) {
                console.error(err)
            }
        }
        createPot()
    }

    const handleDeletePot = () => {
        setPotsButton(prev => ({
            ...prev,
            show: false
        }))
        const potId = potsButton.onePotData._id
        const deletePot = async () => {
            try {
                const response = await apiClient.delete(`/api/crud/pot/${potId}`)
                if (response.status === 200) {
                    getPots();
                }
            } catch (err) {
                setErrMessage({
                    show: true,
                    message: err.message
                })
                //setting an error message in here
                // console.error('!')
            }
        }
        deletePot();
    }

    const handleUpdatePot = () => {
        console.log('data for updating the pot info::', newPotData)
        // setPotsButton(prev => ({
        //     ...prev,
        //     show: false
        // }))
        const updatePot = async () => {
            try {
                const response = await apiClient.put('')
            } catch (err) {
                console.log(err)
            }
        }
    }

    const pot = potsButton.onePotData

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
                            <input type="text" name="" id="" value={newPotData.target} onChange={(e) => handleSaveNewPotData(e, 'target')} />
                        </div>
                        <div className="one-in">
                            <p>Theme</p>
                            <div className='theme-options-pot' onClick={() => setThemeOptions(!themeOptions)}>
                                {/* <div className="inner-theme"> */}
                                <div className="color-container-pot">
                                    <div className='sub-color-container'>
                                        <div className="color-theme" style={{ "--theme-choosing-color": newPotData.theme ? newPotData.theme : themes[0].theme }}></div>
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
                            <input type="text" name="" id="" placeholder={pot.name} onChange={(e) => handleSaveNewPotData(e, 'name')} />
                        </div>
                        <div className="one-in">
                            <p>Target</p>
                            <input type="text" name="" id="" placeholder={pot.target} onChange={(e) => handleSaveNewPotData(e, 'target')} />
                        </div>
                        <div className="one-in">
                            <p>Theme</p>
                            <div className='theme-options-pot' onClick={() => setThemeOptions(!themeOptions)}>
                                {/* <div className="inner-theme"> */}
                                <div className="color-container-pot">
                                    <div className='sub-color-container'>
                                        <div className="color-theme" style={{ "--theme-choosing-color": newPotData.theme ? newPotData.theme : themes[0].theme }}></div>
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
                <button className="add-b" onClick={handleUpdatePot}>
                    Update Pot
                </button>
            </div>
        )
    }

    else if (potsButton.action === 'delete') {
        return (
            <div className='add-budget-container delete'>
                <div className="add-header">
                    <h2>Delete 'Savings'?</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>
                    Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                <div className="button-delete">
                    <button className="red-b" onClick={handleDeletePot}>
                        Yes, Confirm Deletion
                    </button>
                    <button onClick={() => setPotsButton(prev => ({ ...prev, show: false }))}>
                        No, Go Back
                    </button>
                </div>
            </div>
        )

    } else if (errMessage.show === true) {
        return (
            <ErrMessage message={errMessage.message} />
        )
    }
}