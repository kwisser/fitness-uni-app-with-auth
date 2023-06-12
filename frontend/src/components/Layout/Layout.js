import { Outlet, Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faDumbbell, faCalendar, faSignOutAlt, faHome, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AppBar, Toolbar, Box, Button } from '@mui/material';

import React, { useEffect,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAvailableExercises} from '../../actions/availableExercisesActions';
import { fetchAvailableFood} from '../../actions/availableFoodActions';
import { AuthContext } from '../../AuthContext';
import './Layout.css';

const Layout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());
  }, [dispatch]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" gap={2}>
            <Button component={RouterLink} to="/" startIcon={<FontAwesomeIcon icon={faHome} className="icon" />}>
              Home
            </Button>

            {isLoggedIn ? (
            <>
              <Button component={RouterLink} to="/food" startIcon={<FontAwesomeIcon icon={faUtensils} className="icon" />}>
                Food
              </Button>

              <Button component={RouterLink} to="/exercises" startIcon={<FontAwesomeIcon icon={faDumbbell} className="icon" />}>
                Exercises
              </Button>

              <Button component={RouterLink} to="/calendar" startIcon={<FontAwesomeIcon icon={faCalendar} className="icon" />}>
                Calendar
              </Button>

              <Button component={RouterLink} to="/profiles" startIcon={<FontAwesomeIcon icon={faUser} className="icon" />}>
                Profiles
              </Button>

              <Button component={RouterLink} to="/logout" startIcon={<FontAwesomeIcon icon={faSignOutAlt} className="icon" />}>
                Logout
              </Button>
            </>
            ) : (
            <>
              <Button component={RouterLink} to="/login" startIcon={<FontAwesomeIcon icon={faSignInAlt} className="icon" />}>
                Login
              </Button>

              <Button component={RouterLink} to="/register" startIcon={<FontAwesomeIcon icon={faUserPlus} className="icon" />}>
                Register
              </Button>
            </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  )
};

export default Layout;
