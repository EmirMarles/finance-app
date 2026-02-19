import './AddBudget.css'
import CloseSign from '../../public/assets/images/icon-close-modal.svg?react'

export function AddBudget({ budgetButton, setBudgetButton, edit }) {

    const handleClose = () => {
        setBudgetButton(prev => ({
            ...prev,
            show: false
        }))
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