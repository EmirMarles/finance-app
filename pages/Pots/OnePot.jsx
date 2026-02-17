import './OnePot.css';
import IconEllipsis from '../../public/assets/images/icon-ellipsis.svg?react';


export function OnePot({ potData }) {


    const percentage = Math.round((potData.total / potData.target) * 100)
    
    return (
        <div className="one-pot"
            style={{ "--pot-theme": potData.theme }}
        >
            <div className="pot-header">
                <div className="sub-header-pot">
                    <div className="color"></div>
                    <h3>{potData.name}</h3>
                </div>
                <IconEllipsis className="ellipsis-icon"></IconEllipsis>
            </div>

            <div className="save-data">
                <div className="total-saved">
                    <h5>Total Saved</h5>
                    <h5>${potData.total}</h5>
                </div>
                <progress className="progress-pot" value={percentage} max={100}></progress>
                <div className="percentage">
                    <p>{percentage}%</p>
                    <p>Target of ${potData.target}</p>
                </div>
                <div className="buttons">
                    <button className='add-money'>Add Money</button>
                    <button className="withdraw">Withdraw</button>
                </div>
            </div>
        </div>
    )
}
