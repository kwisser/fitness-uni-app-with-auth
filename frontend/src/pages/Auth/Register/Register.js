import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { postRegisterUser } from '../../../api/authApi';
import './Register.css'

const USER_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [street, setStreet] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    useEffect(() => {
        if (success) {
            navigate('/');
            navigate(0);
        }
    }, [success, navigate]);

    useEffect(() => {
        userRef.current.focus();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidName = USER_REGEX.test(email);
        const isValidPwd = PWD_REGEX.test(pwd);

        if (!isValidName || !isValidPwd) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = postRegisterUser(email, pwd, firstname, lastname, phone, country, city, postcode, street);
            console.log(response?.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
            // Clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="body1">
                        <MuiLink href="/login">Sign In</MuiLink>
                    </Typography>
                </section>
            ) : (
                <section>
                    <Typography
                        variant="body1"
                        ref={errRef}
                        className={errMsg ? "error-message" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </Typography>
                    <Typography variant="h1">Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            E-Mail:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="email"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            error={!validName}
                            helperText={!validName && "Invalid email format"}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        {userFocus && user && !validName && (
                            <Typography variant="caption">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </Typography>
                        )}

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            error={!validPwd}
                            helperText={!validPwd && "Invalid password format"}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        {pwdFocus && !validPwd && (
                            <Typography variant="caption">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number, and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </Typography>
                        )}

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            error={!validMatch}
                            helperText={!validMatch && "Passwords do not match"}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        {matchFocus && !validMatch && (
                            <Typography variant="caption">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </Typography>
                        )}

                        <label htmlFor="firstname">
                            Firstname:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="firstname"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                        />

                        <label htmlFor="lastname">
                            Lastname:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="lastname"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            required
                        />

                        <label htmlFor="street">
                            Street:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="street"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                            required
                        />

                        <label htmlFor="postcode">
                            Postcode:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="postcode"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setPostcode(e.target.value)}
                            value={postcode}
                            required
                        />

                        <label htmlFor="city">
                            City:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="city"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            required
                        />

                        <label htmlFor="phone">
                            Phone:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="phone"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                        />

                        <label htmlFor="country">
                            Country:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <TextField
                            type="text"
                            id="country"
                            inputRef={userRef}
                            autoComplete="off"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            required
                        />

                        <Button
                            variant="contained"
                            disabled={!validName || !validPwd || !validMatch}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Typography variant="body1">
                        Already registered?<br />
                        <span className="line">
                            <MuiLink href="/login">Sign In</MuiLink>
                        </span>
                    </Typography>
                </section>
            )}
        </>
    )
}

export default Register
