import { Outlet, Link } from "react-router-dom";
import isLoggedIn from "../../tools/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faDumbbell, faCalendar, faSignOutAlt, faHome, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import "./Layout.css";

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAvailableExercises} from '../../actions/availableExercisesActions';
import { fetchAvailableFood} from '../../actions/availableFoodActions';

const Layout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchAvailableExercises());
      dispatch(fetchAvailableFood());
   
    }, [dispatch]);

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} className="icon" />
                            Home
                        </Link>
                    </li>
                    {isLoggedIn() ? (
                        <>
                            <li>
                                <Link to="/food">
                                    <FontAwesomeIcon icon={faUtensils} className="icon" />
                                    Food
                                </Link>
                            </li>
                            <li>
                                <Link to="/exercises">
                                    <FontAwesomeIcon icon={faDumbbell} className="icon" />
                                    Exercises
                                </Link>
                            </li>
                            <li>
                                <Link to="/calendar">
                                    <FontAwesomeIcon icon={faCalendar} className="icon" />
                                    Calendar
                                </Link>
                            </li>
                            <li>
                                <Link to="/profiles">
                                    <FontAwesomeIcon icon={faUser} className="icon" />
                                    Profiles
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">
                                    <FontAwesomeIcon icon={faSignInAlt} className="icon" />
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    <FontAwesomeIcon icon={faUserPlus} className="icon" />
                                    Register
                                </Link>
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
