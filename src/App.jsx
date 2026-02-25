import './App.css'
import { HomePage } from '../pages/HomePage/HomePage'
import { Transactions } from '../pages/Transactions/Transactions'
import { Budgets } from '../pages/Budgets/Budgets'
import { Pots } from '../pages/Pots/Pots'
import { RecurringBills } from '../pages/RecurringBills/RecurringBills'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import moneyData from '../data.json'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Login } from '../pages/Login/Login'
import { ProtectedRoutes } from '../customHooks/ProtectedRoutes'

ChartJS.register(ArcElement, Tooltip, Legend);


function App() {

  const [chosenTab, setChosenTab] = useState('home')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoutes> <HomePage moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab} /> </ProtectedRoutes>}  ></Route>
        <Route path='/transactions' element={
          <ProtectedRoutes><Transactions moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab} /></ProtectedRoutes>} ></Route>
        <Route path='/budgets' element={
          <ProtectedRoutes><Budgets moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></Budgets></ProtectedRoutes>}></Route>
        <Route path='/pots' element={
          <ProtectedRoutes><Pots moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></Pots></ProtectedRoutes>}></Route>
        <Route path='/recurring-bills' element={
          <ProtectedRoutes><RecurringBills moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></RecurringBills></ProtectedRoutes>}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
