import './App.css'
import { HomePage } from '../pages/HomePage'
import { Transactions } from '../pages/Transactions/Transactions'
import { Budgets } from '../pages/Budgets/Budgets'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import moneyData from '../data.json'

function App() {

  const [chosenTab, setChosenTab] = useState('home')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage chosenTab={chosenTab} setChosenTab={setChosenTab} />} ></Route>
        <Route path='/transactions' element={<Transactions moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab} />} ></Route>
        <Route path='/budgets' element={<Budgets moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></Budgets>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
