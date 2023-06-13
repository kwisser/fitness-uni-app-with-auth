import axios from "./axios";

const REGISTER_URL = '/signup';

export const postRegisterUser = async (email, pwd, firstname, lastname, phone, country, city, postcode, street) => {
    await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, pwd, firstname, lastname, phone, country, city, postcode, street }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
} 