import "./CreateEmployee.css"
import { useState } from "react"
import { useDispatch } from "react-redux"

import * as userActions from "../../../../store/user"

function CreateEmployee() {
    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("staff")

    const handleRadioClick = (role, e) => {
        e.stopPropagation()
        setRole(role)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newEmployee = {
            username: username,
            email: email,
            password: password,
            role: role
        }

        dispatch(userActions.addEmployeeThunk(newEmployee))
    }



    return (
        <form onSubmit={(e) => handleSubmit(e)} className="create-container">
            <div id='employee-div'>
                <section className='create-header'>Create a New Employee Profile</section>
                <section >
                    <section>
                        <aside>
                            <section>Employee Username</section>
                            <input
                                type="text"
                                minLength={4}
                                maxLength={30}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </aside>
                        <aside>
                            <section>Employee Email</section>
                            <input
                                type='email'
                                minLength={3}
                                maxLength={256}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </aside>
                        <aside>
                            <section>Employee Password</section>
                            <input
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </aside>

                        <aside>
                            <section>Employee Role</section>
                            <section>
                                <input
                                    type="radio"
                                    id="role-staff"
                                    checked={role === "staff"}
                                    onClick={(e) => handleRadioClick("staff", e)}
                                />
                                <label htmlFor={`role-staff`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleRadioClick("staff", e)
                                    }}>
                                    Staff
                                </label>

                                <input
                                    type="radio"
                                    id="role-admin"
                                    checked={role === "admin"}
                                    onClick={(e) => handleRadioClick("admin", e)}
                                />
                                <label htmlFor={`role-admin`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleRadioClick("admin", e)
                                    }}>
                                    Admin
                                </label>
                            </section>
                        </aside>
                    </section>
                </section>


                <section className="changes-container">
                    <button type="submit" className="pointer save-changes-button">Create New Employee Profile</button>
                </section>
            </div>
        </form>
    )
}

export default CreateEmployee
