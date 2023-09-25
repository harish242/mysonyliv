import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Regis() {
    const store = useSelector(state => state.others.regisReducer);
    const token = useSelector(state => state.persisted.localJwtReducer.tokens);
    const [regfail, setFailregis] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showLoginText, setShowLoginText] = useState(false); // State for showing "Login" text
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (e) => {
        const idn = e.target.id;
        if (e.target.id === "password") {
            setPassword(e.target.value);
            setShowPasswordError(false); // Reset the password error when typing
        }

        switch (idn) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (username.trim() === '') {
            setUsernameError('Please enter a username');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (email.trim() === '') {
            setEmailError('Please enter an email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.trim() === '') {
            setPasswordError('Please enter a password');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const doPost = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Form validation failed
            return;
        }

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'projectId': 'xybcw190kyb8' },
                body: JSON.stringify({ "name":username,"email":email,"password":password, "appType": "ott" })
            });

            const data = await response.json();

            if (data.status === 'success') {
                setShowLoginText(true); // Show "Login" text on successful registration
                // navigate('/login');
            } else if (data.status === 'fail') {
                setFailregis(data.message);
            }
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Use useEffect to hide the "Login" text after 2 seconds
    useEffect(() => {
        let timer;
        if (showLoginText) {
            timer = setTimeout(() => {
                setShowLoginText(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [showLoginText]);

    return (
        <div className="min-h-screen bg-cover" style={{ backgroundImage: 'url(https://platinmods.com/attachments/sonyliv-jarvismods-png.240209/)' }}>
               {showLoginText && (
                        <p className="text-center text-gray-500 text-md" style={{ color: 'white',position:'relative',top:'30px' }}>
                            Successfully registered! Please <Link to="/login"><span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px', textDecoration: 'underline' }}>Login</span></Link>...
                        </p>
                    )}
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md bg-white bg-opacity-30 p-6 rounded-lg">
                    <form onChange={handleInput} onSubmit={doPost}>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border bg-transparent rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                            <p className="text-red-500 text-xs italic">{usernameError}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                            <p className="text-red-500 text-xs italic">{emailError}</p>
                        </div>
                        <div className="mb-6" style={{ marginBottom: '0px' }}>
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                            <p className="text-red-500 text-xs italic">{passwordError}</p>
                        </div>
                        {showPasswordError && (
                            <div style={{ marginBottom: '10px' }}>
                                <p style={{ color: 'red' }}>Please enter your password</p>
                            </div>
                        )}
                        {<p style={{color:'red'}}>{regfail}</p>}
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 md:mb-0" type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                 
                    <p className="text-center text-gray-500 text-md" style={{ color: 'white' }}>
                        &copy; 2020 Already have an account? <Link to="/login"><span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px', textDecoration: 'underline' }}>Login</span></Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
