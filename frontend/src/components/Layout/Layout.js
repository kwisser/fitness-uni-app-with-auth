import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAvailableExercises } from '../../actions/availableExercisesActions';
import { fetchAvailableFood } from '../../actions/availableFoodActions';
import { AuthContext } from '../../AuthContext';
import './Layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faDumbbell, faCalendar, faSignOutAlt, faHome, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Toolbar, Box, Button, Drawer, List, ListItem } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const MenuButton = ({ to, icon, children }) => (
    <Button component={RouterLink} to={to} startIcon={<FontAwesomeIcon icon={icon} className="icon" />}>
      {children}
    </Button>
  );

  useEffect(() => {
    dispatch(fetchAvailableExercises());
    dispatch(fetchAvailableFood());
  }, [dispatch]);

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleOpen = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
                <FontAwesomeIcon icon={faBars} />
              </IconButton>
              <Drawer
                anchor='left'
                open={drawerOpen}
                onClose={handleClose}
              >
                <List>
                  {isLoggedIn ? (
                    <>
                      <ListItem>
                        <MenuButton to="/food" icon={faUtensils}>Food</MenuButton>
                      </ListItem>
                      <ListItem>
                        <MenuButton to="/exercises" icon={faDumbbell}>Exercises</MenuButton>
                      </ListItem>
                      <ListItem>
                        <MenuButton to="/calendar" icon={faCalendar}>Calendar</MenuButton>
                      </ListItem>
                      <ListItem>
                        <MenuButton to="/profiles" icon={faUser}>Profiles</MenuButton>
                      </ListItem>
                      <ListItem>
                        <MenuButton to="/logout" icon={faSignOutAlt}>Logout</MenuButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem>
                        <MenuButton to="/login" icon={faSignInAlt}>Login</MenuButton>
                      </ListItem>
                      <ListItem>
                        <MenuButton to="/register" icon={faUserPlus}>Register</MenuButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </>
          ) : (
            <Box display="flex" gap={2}>
              <MenuButton to="/" icon={faHome}>Home</MenuButton>
              {isLoggedIn ? (
                <>
                  <MenuButton to="/food" icon={faUtensils}>Food</MenuButton>
                  <MenuButton to="/exercises" icon={faDumbbell}>Exercises</MenuButton>
                  <MenuButton to="/calendar" icon={faCalendar}>Calendar</MenuButton>
                  <MenuButton to="/profiles" icon={faUser}>Profiles</MenuButton>
                  <MenuButton to="/logout" icon={faSignOutAlt}>Logout</MenuButton>
                </>
              ) : (
                <>
                  <MenuButton to="/login" icon={faSignInAlt}>Login</MenuButton>
                  <MenuButton to="/register" icon={faUserPlus}>Register</MenuButton>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;
