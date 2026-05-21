// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { registerUser } from "../../services/User";

function CreateGoalForm() {

    return(
        <div>
            <h2>Sukurkite naują taupymo tikslą</h2>
            <form>
                <label className="label pt-5">Tikslo pavadinimas</label>
                <input type="text" placeholder="Pavadinimas" />


                <label className="label pt-5">Norima sutaupyti suma</label>
                <input type="text" placeholder="Suma" />

                <label className="label pt-5">Įgyvendinimo data</label>
                <input type="date" placeholder="Data" />


                <button type="submit">Create Goal</button>
            </form>
        </div>
    )
}

export default CreateGoalForm;
