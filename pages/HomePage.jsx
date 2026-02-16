import './HomePage.css'
import { SideBar } from "../components/SideBar"

export function HomePage({ chosenTab, setChosenTab }) {
    return (
        <div className="home-page-desktop">
            <SideBar chosenTab={chosenTab} setChosenTab={setChosenTab}></SideBar>
            Home Page!
        </div>
    )
}