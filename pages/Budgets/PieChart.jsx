import './PieChart.css';
import { calculateMoneySpentOnCategory } from '../../utils/Helper';
import { getAllCategories } from '../../utils/Helper';
import { Doughnut } from 'react-chartjs-2';

export function PieChart({ budgetData, transactions, isSmall }) {

    const categories = getAllCategories(transactions).slice(1, getAllCategories(transactions).length);
    const dataSetData = categories.map((category) => calculateMoneySpentOnCategory(category.category, transactions))
    const totalSpent = dataSetData.reduce((acc, value) => acc + value, 0)
    const totalBudget = budgetData.reduce((acc, value) => acc + value.maximum, 0)

    const data = {
        datasets: [
            {
                data: dataSetData,
                backgroundColor: budgetData.map((budget) => budget.theme),
                borderColor: budgetData.map((budget) => budget.theme.replace('0.2', '1')),
                borderWidth: 1,
                hoverOffset: 10
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
    
    if (isSmall) {
        return (
            <div className="pie-chart-inside small">
                <p> <span>${totalSpent}</span> of ${totalBudget} limit</p>
                <Doughnut data={data} options={options} className='pie-svg'></Doughnut>
            </div>
        )
    }

    else {
        return (
            <div className="pie-chart-inside">
                <p className='pie-chart-text'> <span>${totalSpent}</span> of ${totalBudget} limit</p>
                <Doughnut data={data} options={options} className='pie-svg'></Doughnut>
            </div>
        )
    }
}
