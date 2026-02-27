import './AddBudget.css'
import CloseSign from '../../public/assets/images/icon-close-modal.svg?react'
import IconCaretDown from '../../public/assets/images/icon-caret-down.svg?react'
import { themes } from '../../consts/thems'
import { useEffect, useState } from 'react'
import { useAuth } from '../../customHooks/useAuth'
import { categories } from '../../consts/categories'
import apiClient from '../../utils/apiClient'
import { getColorNameByRgbString } from '../../utils/helper'

export function AddBudget({ setBudgetData, budgetData, budgetButton, setBudgetButton }) {

    const [themeOptions, setThemeOptions] = useState(false)
    const [chooseCategories, setChooseCategories] = useState(false)
    const [error, setError] = useState({
        errorMsg: "Budget with such category already exists!",
        show: false
    })

    const { user } = useAuth();
    const [newBudgetData, setNewBudgetData] = useState({
        category: "Entertainment",
        maximum: null,
        theme: themes[3],
        user: user._id
    })

    const oneBudgetData = budgetButton.oneBudgetData

    const [udpateBudgetData, setUpdateBudgetData] = useState({
        category: null,
        maximum: null,
        theme: null,
        user: user._id
    })

    useEffect(() => {
        const budgetData = budgetButton.oneBudgetData
        if (budgetData === undefined || budgetData === null) return
        setUpdateBudgetData(budgetData)
    }, [oneBudgetData])

    const handleClose = () => {
        setBudgetButton(prev => ({
            ...prev,
            show: false
        }))
    }

    useEffect(() => {
        if (error.show === false) return
        const timeOutId = setTimeout(() => {
            setError(prev => ({
                ...prev,
                show: false
            }))
        }, 1500)
        // clearTimeout(timeOutId)
        return () => clearTimeout(timeOutId)
    }, [error])

    let chosenThemes = []
    // use useMemo for this 
    for (let i = 0; i < budgetData.length; i++) {
        for (let k = 0; k < themes.length; k++) {
            if (themes[k].theme === budgetData[i].theme) {
                chosenThemes.push(themes[k].theme)
            }
        }
    }

    const handleChooseColor = (theme) => {
        setNewBudgetData(prev => ({
            ...prev,
            theme: theme
        }))
        setThemeOptions(false)
    }

    const handleMaximumChange = (e) => {
        const numericValue = e.target.value.replace(/\D/g, "")
        setNewBudgetData(prev => ({
            ...prev,
            maximum: numericValue
        }))
    }

    const handleChooseCategory = (category) => {
        setNewBudgetData(prev => ({
            ...prev,
            category: category
        }))
    }

    const handleOpenCategories = () => {
        setChooseCategories(!chooseCategories)
    }

    const getBudgets = async () => {
        try {
            const response = await apiClient.get(`/api/crud/budgets/${user._id}`);
            if (response) {
                setBudgetData(response.data)
            }
        }
        catch (err) {
            console.error('error:', err)
        }
    }

    const handleAddBudget = () => {
        for (let i = 0; i < budgetData.length; i++) {
            if (budgetData[i].category === newBudgetData.category) {
                setError({
                    errorMsg: "Budget with such category exists!",
                    show: true
                })
                return
            }
        }
        if (newBudgetData.maximum === null) {
            setError({
                errorMsg: "Please fill out the maximum!",
                show: true
            })
            return
        }

        let budgetObject = {
            user: newBudgetData.user,
            category: newBudgetData.category,
            maximum: Number(newBudgetData.maximum),
            theme: newBudgetData.theme.theme
        }

        const createNewBudget = async () => {
            try {
                const response = await apiClient.post(`/api/crud/add-bugdet/${user._id}`,
                    budgetObject
                )
                if (response.status === 201) {
                    setBudgetButton(prev => ({
                        ...prev,
                        show: false
                    }))
                    getBudgets();
                }
            } catch (err) {
                console.error(err)
            }
        }
        createNewBudget();
    }

    const handleDeleteBudget = () => {
        try {
            const budgetData = budgetButton.oneBudgetData
            const deleteBudget = async () => {
                const response = await apiClient.delete(`/api/crud/budget/${budgetData._id}`)
                if (response.status === 201) {
                    setBudgetButton(prev => ({
                        ...prev,
                        show: false
                    }))
                    getBudgets();
                }
            }
            deleteBudget();
        }
        catch (err) {
            console.error(err)
        }
        return
    }

    const handleSetUpdateCategory = (category) => {
        setUpdateBudgetData(prev => ({
            ...prev,
            category: category
        }))
    }

    const handleSetUpdateColor = (theme) => {
        setUpdateBudgetData(prev => ({
            ...prev,
            theme: theme
        }))
    }

    const handleSetUpdateMaximum = (e) => {
        const numericValue = e.target.value.replace(/\D/g, "")
        setUpdateBudgetData(prev => ({
            ...prev,
            maximum: numericValue
        }))
    }

    const handleUpdateBudget = () => {
        try {
            const budgetData = udpateBudgetData
            const updateBudget = async () => {
                const response = await apiClient.put(`/api/crud/update-budget/${budgetData._id}`,
                    budgetData
                )
                if (response.status === 200) {
                    setBudgetButton(prev => ({
                        ...prev,
                        show: false
                    }))
                    getBudgets();
                }
            }
            updateBudget();
        }
        catch (err) {
            console.error('Error!:', err)
        }
    }

    if (budgetButton.action === 'add') {
        return (
            <div className='add-budget-container'>
                <div className="add-header">
                    <h2>Add New Budget</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>Choose a category to set a spending budget. These categories can help you monitor spending.</p>
                <div className="budget-info">
                    <form action="">
                        <div className="one-in" onClick={handleOpenCategories}>
                            <p>Budget Category</p>
                            <div className="theme-choose">
                                <div className="inner-theme">
                                    <div className="color-container">
                                        <p>{newBudgetData.category}</p>
                                    </div>
                                    <IconCaretDown className='icon-caret' ></IconCaretDown>
                                </div>
                                {
                                    chooseCategories &&
                                    <div className='theme-options-theme'>
                                        {categories.length > 0 &&
                                            categories.map((category, index) => {
                                                return <div key={index} className='one-theme' onClick={() => handleChooseCategory(category)}>
                                                    <div className="not-used">
                                                        <p>{category}</p>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                            </div>
                            {error.show && error.errorMsg === 'Budget with such category exists!' &&
                                <div className='show-error'>
                                    <p className='err-msg'>Error! {error.errorMsg}</p>
                                </div>
                            }
                        </div>
                        <div className="one-in">
                            <p>Maximum Spend</p>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern='[0-9]*'
                                name="number"
                                value={newBudgetData.maximum}
                                onChange={handleMaximumChange} required={true} />
                            {error.show && error.errorMsg === 'Please fill out the maximum!' &&
                                <div className='show-error'>
                                    <p className='err-msg'>Error! {error.errorMsg}</p>
                                </div>
                            }
                        </div>
                        <div className="one-in" onClick={() => setThemeOptions(!themeOptions)}>
                            <p>Theme</p>
                            <div className="theme-choose">
                                <div className="inner-theme">
                                    <div className="color-container">
                                        <div className="color-theme" style={{ "--theme-choosing-color": newBudgetData.theme.theme }}></div>
                                        <p>{newBudgetData.theme.color}</p>
                                    </div>
                                    <IconCaretDown className='icon-caret' ></IconCaretDown>
                                </div>
                                {
                                    themeOptions &&
                                    <div className='theme-options-theme'>
                                        {themes.length > 0 &&
                                            themes.map((theme, index) => {
                                                return <div key={index} className='one-theme' onClick={() => handleChooseColor(theme)}>
                                                    <div className="not-used">
                                                        <div className="color-theme" style={{ "--theme-choosing-color": theme.theme }}></div>
                                                        <p>{theme.color}</p>
                                                    </div>
                                                    {chosenThemes.includes(theme.theme) && <p>Aleady Used</p>}
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <button className="add-b" onClick={handleAddBudget}>
                    Add Budget
                </button>
            </div>
        )
    }

    else if (budgetButton.action === 'delete') {
        return (
            <div className='add-budget-container delete'>
                <div className="add-header">
                    <h2>Delete '{oneBudgetData?.category}'?</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</p>

                <div className="button-delete">
                    <button className="red-b" onClick={handleDeleteBudget}>
                        Yes, Confirm Deletion
                    </button>
                    <button onClick={() => setBudgetButton(prev => ({ ...prev, show: false }))}>
                        No, Go Back
                    </button>
                </div>

            </div>
        )
    }

    else {
        return (
            <div className='add-budget-container'>
                <div className="add-header">
                    <h2>Edit Budget "{udpateBudgetData.category}"</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>As your budgets change, feel free to update your spending limits.</p>
                <div className="budget-info">
                    <form action="">
                        <div className="one-in" onClick={handleOpenCategories}>
                            <p>Budget Category</p>
                            <div className="theme-choose">
                                <div className="inner-theme">
                                    <div className="color-container">
                                        <p>{udpateBudgetData.category}</p>
                                    </div>
                                    <IconCaretDown className='icon-caret'></IconCaretDown>
                                </div>
                                {
                                    chooseCategories &&
                                    <div className='theme-options-theme'>
                                        {categories.length > 0 &&
                                            categories.map((category, index) => {
                                                return <div key={index} className='one-theme' onClick={() => handleSetUpdateCategory(category)}>
                                                    <div className="not-used">
                                                        <p>{category}</p>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                            </div>
                            {error.show && error.errorMsg === 'Budget with such category exists!' &&
                                <div className='show-error'>
                                    <p className='err-msg'>Error! {error.errorMsg}</p>
                                </div>
                            }
                        </div>
                        <div className="one-in">
                            <p>Maximum Spend</p>
                            <input type="text" name="" id="" placeholder={udpateBudgetData.maximum} onChange={handleSetUpdateMaximum} value={udpateBudgetData.maximum} />
                        </div>
                        <div className="one-in" onClick={() => setThemeOptions(!themeOptions)}>
                            <p>Theme</p>
                            <div className="theme-choose">
                                <div className="inner-theme">
                                    <div className="color-container">
                                        <div className="color-theme" style={{ "--theme-choosing-color": udpateBudgetData.theme }}></div>
                                        <p>{udpateBudgetData ? getColorNameByRgbString(udpateBudgetData.theme) : udpateBudgetData.theme}</p>
                                    </div>
                                    <IconCaretDown className='icon-caret' ></IconCaretDown>
                                </div>
                                {
                                    themeOptions &&
                                    <div className='theme-options-theme'>
                                        {themes.length > 0 &&
                                            themes.map((theme, index) => {
                                                return <div key={index} className='one-theme' onClick={() => handleSetUpdateColor(theme.theme)}>
                                                    <div className="not-used">
                                                        <div className="color-theme" style={{ "--theme-choosing-color": theme.theme }}></div>
                                                        <p>{theme.color}</p>
                                                    </div>
                                                    {chosenThemes.includes(theme.theme) && <p>Aleady Used</p>}
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <button className="add-b" onClick={handleUpdateBudget}>
                    Update Budget
                </button>
            </div>
        )
    }

}