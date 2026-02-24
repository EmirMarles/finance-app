import './Pots.css';
import { SideBar } from '../../components/SideBar';
import { OnePot } from './OnePot';
import { useEffect, useState } from 'react';
import { AddPot } from './AddPot';
import { AddMoney } from './AddMoney';
import { themes } from '../../consts/thems';
import axios from 'axios';
import { useAuth } from '../../customHooks/useAuth';
import apiClient from '../../utils/apiClient';

export function Pots({ moneyData, chosenTab, setChosenTab }) {

    const [potsData, setPotsData] = useState([])

    const [showAddPotForm, setShowAddPotForm] = useState(false)
    const [potsButton, setPotsButton] = useState({
        action: 'add',
        show: false,
        onePotData: null
    })
    const [showAddMoneyButton, setShowAddMoneyButton] = useState({
        show: false,
        action: 'add',
        onePotData: null
    })

    const { user } = useAuth();

    useEffect(() => {
        if (potsData.length > 0) return
        if (!user._id) return
        const getPots = async () => {
            const response = await axios.get(`http://localhost:5000/api/crud/pots/${user._id}`)
            if (response) {
                setPotsData(response.data)
            }
        }
        getPots();
    }, [user?._id])

    const togglePotsButtonAdd = (action) => {
        setPotsButton({
            action: action,
            show: !potsButton.show
        })
    }

    const toggleAddPotForm = () => {
        console.log('clicked')
        setShowAddPotForm(!showAddPotForm)
    }

    return (
        <div className="pots-page">
            <SideBar moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            <div className="main-pots">
                <div className="pots-header">
                    <h4>Pots</h4>
                    <button onClick={() => togglePotsButtonAdd('add')}>Add New Pot</button>
                </div>
                <div className="pots-grid">
                    {Array.isArray(potsData) && potsData.length > 0 &&
                        potsData.map((pot, index) => {
                            return <OnePot potsButton={potsButton} setPotsButton={setPotsButton} key={index} potData={pot}
                                showAddMoneyButton={showAddMoneyButton} setShowAddMoneyButton={setShowAddMoneyButton}
                            ></OnePot>
                        })
                    }
                </div>
                {showAddPotForm &&
                    <div className="add-pot-form-show">
                        <AddPot></AddPot>
                    </div>
                }
            </div>
            {showAddMoneyButton.show &&
                <AddMoney setPotsData={setPotsData} setShowAddMoneyButton={setShowAddMoneyButton} showAddMoneyButton={showAddMoneyButton}> </AddMoney>
            }
            {potsButton.show &&
                <AddPot setPotsData={setPotsData} potsButton={potsButton} setPotsButton={setPotsButton}></AddPot>
            }
        </div >
    )
}
