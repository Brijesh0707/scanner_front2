import React, { useState } from 'react';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,setLoading]=useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://scanner-server.onrender.com/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailAddress:email, password:password })
      });
      const res = await response.json()
      localStorage.setItem('user_id',res?.student2?._id)
      alert('Login Successfully')
      setLoading(false)
      window.location.reload()
    
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error(error);
      setLoading(false)
    }
  };

  return (
    <>
      <div className='w-[100%] h-[100%]'>
        <div className='w-[400px] md:w-[300px] bg-slate-100 rounded-md pl-5 pr-5 pb-3 pt-3'>
          <h1 className='text-center font-[700] text-[20px]'>Login Student Portal</h1>
          <br />
          <input
            className='w-[100%] bg-slate-200 placeholder-gray-500  outline-none border-none rounded-md pl-2 pt-1 pb-1'
            type='text'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            className='w-[100%] placeholder-gray-500 bg-slate-200  outline-none border-none rounded-md pl-2 pt-1 pb-1'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <p className='text-red-600 pb-3'>{error}</p>
          <button
            className='w-[100%] pt-2 pb-2 rounded-lg text-white bg-blue-500  font-500'
            onClick={handleLogin}
          >
            {loading===true?'Loading....':'Login'}
          </button>
          <br />
          <p onClick={() => setAuth((prev) => !prev)} className='text-gray-600 pt-3 pb-3 cursor-pointer'>
            Click here to register
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
