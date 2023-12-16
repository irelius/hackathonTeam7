import "./EditEmployees.css"
import { useState } from "react"
import * as userActions from "../../../../../store/user"
import * as sessionActions from "../../../../../store/session"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function EditEmployees({ employee, onCloseExpandRow }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUsername] = useState(employee.username)
    // currently doesn't allow for admin to change passwords. this is set up to be implemented later if need be
    const [password, setPassword] = useState(employee.password)
    const [email, setEmail] = useState(employee.email)
    const [role, setRole] = useState(employee.role)

    const handleRadioClick = (type, e) => {
        e.stopPropagation()
        setRole(type)
    }

    const currUser = useSelector(state => state.session.user)

    const handleEmployeeEdit = (e) => {
        e.preventDefault()

        const trimmedUsername = username.trim()
        const trimmedEmail = email.trim()

        const editEmployeeInfo = {
            username: trimmedUsername,
            password: password,
            email: trimmedEmail,
            role: role
        }

        dispatch(userActions.editUserThunk(employee.id, editEmployeeInfo))
        return onCloseExpandRow()
    }

    const handleCancel = () => {
        return onCloseExpandRow()
    }

    const handleDelete = () => {
        if (employee.id === currUser.id) {
            const confirmation = window.confirm("You're about to delete your own account. Are you sure?")
            if (!confirmation) {
                return;
            }
        }
        if (employee.role === "admin") {
            const confirmation = window.confirm("You're about to delete another admin's account. Are you sure?")
            if (!confirmation) {
                return;
            }
        }
        dispatch(userActions.deleteEmployeeThunk(employee.id))
            .then(() => {
                if (employee.id === currUser.id) {
                    dispatch(sessionActions.logout());
                    history.push("/");
                }
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            })
            .finally(() => {
                onCloseExpandRow();
            });
    }

    return (
        <form onSubmit={(e) => handleEmployeeEdit(e)} id='employee-edit-main-container' className="bg-200">
            <section id="employee-info-container">
                <section id="employee-section-1">
                    {/* Username section */}
                    <section id='employee-username'>
                        <aside className="employee-input-header">Edit Employee Username:</aside>
                        <input
                            type="text"
                            required
                            minLength={4}
                            defaultValue={username}
                            onKeyDown={(e) => {
                                if (e.key === " ") {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </section>

                    {/* Email section */}
                    <section id='employee-email'>
                        <aside className="employee-input-header">Edit Employee Email:</aside>
                        <input
                            type="email"
                            required
                            defaultValue={email}
                            onKeyDown={(e) => {
                                if (e.key === " ") {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>

                </section>

                {/* Role section */}
                <section id="employee-section-2">
                    <aside className="employee-input-header">Edit Employee Role:</aside>
                    <section id="radio-buttons">
                        <section>
                            <input
                                type="radio"
                                id="type-staff"
                                checked={role === "staff"}
                                onClick={(e) => handleRadioClick("staff", e)}
                            />
                            <label htmlFor="type-staff" onClick={(e) => {
                                e.preventDefault()
                                handleRadioClick("staff", e)
                            }}>
                                Staff
                            </label>
                        </section>
                        <section>
                            <input
                                type="radio"
                                id="type-admin"
                                checked={role === "admin"}
                                onClick={(e) => handleRadioClick("admin", e)}
                            />
                            <label htmlFor="type-admin" onClick={(e) => {
                                e.preventDefault()
                                handleRadioClick("admin", e)
                            }}>
                                Admin
                            </label>
                        </section>
                    </section>
                </section>
            </section>

            {/* Button section */}
            <section className="changes-container">
                <button className="pointer save-changes-button" type="submit">
                    Save Changes
                </button>
                <button className="pointer cancel-changes-button" onClick={() => handleCancel()} >
                    Cancel
                </button >
                <button className="pointer delete-button" onClick={() => handleDelete()} >
                    Delete Profile
                </button >
            </section>
        </form>
    )
}

export default EditEmployees
