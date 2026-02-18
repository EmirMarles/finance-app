import './App.css'
import { HomePage } from '../pages/HomePage'
import { Transactions } from '../pages/Transactions/Transactions'
import { Budgets } from '../pages/Budgets/Budgets'
import { Pots } from '../pages/Pots/Pots'
import { RecurringBills } from '../pages/RecurringBills/RecurringBills'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import moneyData from '../data.json'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Login } from '../pages/Login/Login'

ChartJS.register(ArcElement, Tooltip, Legend);


function App() {

  const [chosenTab, setChosenTab] = useState('home')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab} />} ></Route>
        <Route path='/transactions' element={<Transactions moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab} />} ></Route>
        <Route path='/budgets' element={<Budgets moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></Budgets>}></Route>
        <Route path='/pots' element={<Pots moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></Pots>}></Route>
        <Route path='/recurring-bills' element={<RecurringBills moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></RecurringBills>}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
