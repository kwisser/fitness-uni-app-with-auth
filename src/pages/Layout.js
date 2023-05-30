import { Outlet, Link } from "react-router-dom";
import isLoggedIn from "../tools/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import "./Layout.css"

const Layout = () => {


    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isLoggedIn() ? (
                        <>
                            <li>
                                <FontAwesomeIcon icon={faUtensils} className="icon" />
                                <Link to="/food">Food</Link>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDumbbell} fade />
                                <Link to="/exercises"> Exercises</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>

                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/Register">Register</Link>
                            </li>
                        </>


                    )}
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;
