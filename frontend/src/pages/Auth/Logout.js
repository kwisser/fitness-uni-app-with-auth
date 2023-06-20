import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from '../../api/axiosInstance';

const LOGOUT_URL = '/logout';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post(LOGOUT_URL, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                console.log("Logout successful");

                // Weiterleitung zur Startseite nach erfolgreichem Logout
                navigate('/login');
                navigate(0)
            } catch (err) {
                console.log("Error during logout: ", err);
            }
        };

        logout();
    }, [navigate]);

    return null;
};

export default Logout;
