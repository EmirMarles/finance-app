import './AddPot.css'

export function AddPot() {

    <div className="add-pot-form">
        <h4>Add New Pot</h4>
        <p>Create a pot to set savings targets.
            These can help keep you on track as you save for special purchases.</p>

        <div className="name">

        </div>
        <form>
            <label htmlFor="pot-name">Pot Name</label>
            <input type="text" id="pot-name" name="pot-name" required></input>
        </form>
        <form>
            <label htmlFor="pot-target">Target</label>
            <input type="text" id="pot-target" name="pot-target" required></input>
        </form>
        <form>
            <label htmlFor="pot-theme">Theme</label>
            <input type="text" id="pot-theme" name="pot-theme" required></input>
        </form>
    </div>
}