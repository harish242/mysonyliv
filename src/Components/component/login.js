import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Login = () => {
  const [err, setErr] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // New state for the success message
  const [manageErr,setManageErr]=useState(true)
  const store = useSelector((state) => state.persisted.localJwtReducer.tokens);
  const MainStore = useSelector((state) => state.others.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const idn = e.target.id;
    switch (idn) {
      case 'email':
        return dispatch({ type: 'email', payload: e.target.value });
      case 'password':
        return dispatch({ type: 'password', payload: e.target.value });
      default:
        return;
    }
  };

  const doPost = (e) => {
    e.preventDefault();
    try {
      (async () => {
        const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'projectId': 'xybcw190kyb8',
          },
          body: JSON.stringify({ ...MainStore, appType: 'ott' }),
        });

        const data = await response.json();
        const token = data.token;

        dispatch({ type: 'userdetails', payload: data });
        dispatch({ type: 'token', payload: token });

        if (data.status === 'success') {
          setIsLoggingIn(true); // Show the success message
          setManageErr(!manageErr)
          setTimeout(() => {
            setIsLoggingIn(false); // Hide the success message after 2 seconds
            navigate('/home');
          }, 2000);
        } else if (data.status === 'fail') {
          setErr('Incorrect EmailId or Password');
        }
      })();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundImage: 'url(https://www.gadgetmouse.com/wp-content/uploads/2021/07/SonyLIV-featured.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
    <div className="success-message">
    {isLoggingIn && (
          <p className="success-messages" style={{ fontSize: '26px',color:'#ffc403', position:'absolute',top:30,left:50 }}>Logged in successfully !!</p>
        )}
    </div>
      <div className="w-full max-w-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '20px', borderRadius: '10px' }}>
     
        <form onChange={handleInput} onSubmit={doPost}>
          <div className="mb-4">
            <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" />
          </div>
          <div className="mb-6">
            <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
           {manageErr&&<p className="text-red-500 text-xs italic" style={{ fontSize: '16px', color: '#FFB000' }}>{err}</p>} 
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              LogIn
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate('/')}>Register</button>
          </div>
        </form>
       
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
