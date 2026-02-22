import './AddBudget.css'
import CloseSign from '../../public/assets/images/icon-close-modal.svg?react'
import IconCaretDown from '../../public/assets/images/icon-caret-down.svg?react'

import { themes } from '../../consts/thems'
import { useEffect, useState } from 'react'
import { useAuth } from '../../customHooks/useAuth'
import { getAllCategories } from '../../utils/Helper'

export function AddBudget({ budgetData, budgetButton, setBudgetButton, edit }) {

    const [themeOptions, setThemeOptions] = useState(false)
    const [chooseCategories, setChooseCategories] = useState(false)

    const { user } = useAuth();
    const [newBudgetData, setNewBudgetData] = useState({
        category: "Entartainment",
        maximum: null,
        theme: themes[3],
        user: user._id
    })
    // const categories = getAllCategories()

    const handleClose = () => {
        setBudgetButton(prev => ({
            ...prev,
            show: false
        }))
    }

    let chosenThemes = []
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
        setNewBudgetData(prev => ({
            ...prev,
            maximum: e.target.value
        }))
    }

    const handleChooseCategory = (category) => {
        setNewBudgetData(prev => ({
            ...prev,
            category: category
        }))
    }

    const handleAddBudget = () => {
        return
    }

    const categories = [
        "Entertainment",
        "Bills",
        "Groceries",
        "Dining Out",
        "Transportation",
        "Personal Care",
        "Education",
    ]

    const handleOpenCategories = () => {
        setChooseCategories(!chooseCategories)
    }

    useEffect(() => {
        console.log(newBudgetData)
    }, [newBudgetData])

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
                        </div>
                        <div className="one-in">
                            <p>Maximum Spend</p>
                            <input type="number" name="number" onChange={handleMaximumChange} required={true} />
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
                    <h2>Delete 'Entaitenment'?</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</p>

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
    else {
        return (
            <div className='add-budget-container'>
                <div className="add-header">
                    <h2>Edit Budget</h2>
                    <CloseSign className="close-bud" onClick={handleClose}></CloseSign>
                </div>
                <p className='sub-head-add'>As your budgets change, feel free to update your spending limits.</p>
                <div className="budget-info">
                    <form action="">
                        <div className="one-in">
                            <p>Budget Category</p>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="one-in">
                            <p>Maximum Spend</p>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="one-in">
                            <p>Theme</p>
                            <input type="text" name="" id="" />
                        </div>
                    </form>
                </div>
                <button className="add-b">
                    Add Budget
                </button>
            </div>
        )
    }

}