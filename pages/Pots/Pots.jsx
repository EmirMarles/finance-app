import './Pots.css';
import { SideBar } from '../../components/SideBar';
import { OnePot } from './OnePot';
import { useEffect, useState } from 'react';
import { AddPot } from './AddPot';
import { AddMoney } from './AddMoney';
import { useAuth } from '../../customHooks/useAuth';
import apiClient from '../../utils/apiClient';
import { useWindowWidth } from '../../customHooks/useWindowWidth';
import { TABLET_WIDTH } from '../../consts/windowWidth';

export function Pots({ moneyData, chosenTab, setChosenTab }) {

    const [potsData, setPotsData] = useState([])
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
    const width = useWindowWidth()

    useEffect(() => {
        if (potsData.length > 0) return
        if (!user._id) return
        try {
            const getPots = async () => {
                const response = await apiClient.get(`/api/crud/pots/${user._id}`)
                if (response) {
                    setPotsData(response.data)
                }
            }
            getPots();
        } catch (err) {
            console.log(err.message)
        }
    }, [user?._id])

    const togglePotsButtonAdd = (action) => {
        setPotsButton({
            action: action,
            show: !potsButton.show
        })
    }

    return (
        <div className="pots-page">
            {
                width > TABLET_WIDTH
                && <SideBar moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            }
            <div className="main-pots">
                <div className="pots-header">
                    <h4 className='page-header'>Pots</h4>
                    <button className='btn-create-budget' onClick={() => togglePotsButtonAdd('add')}>Add New Pot</button>
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
                {width < TABLET_WIDTH
                    && <SideBar moneyData={moneyData} chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
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
