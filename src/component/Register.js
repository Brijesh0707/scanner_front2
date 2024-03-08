import React, { useState } from 'react';

const Register = ({ setAuth }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false)

  const handleRegister = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://scanner-server.onrender.com/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: fullName,
          phoneNumber: phoneNumber,
          emailAddress: email,
          password: password
        })
      });
        const res = await response.json()
         alert(res?.message)
         setLoading(false)
         setAuth((prev)=>!prev)
    } catch (error) {
      alert("this is error okay",error)
      setLoading(false)
    }
  };

  return (
    <>
      <div className='w-[100%] h-[100%]'>
        <div className='w-[400px] md:w-[300px] bg-slate-100 rounded-md pl-5 pr-5 pb-3 pt-3'>
          <h1 className='text-center font-[700] text-[20px]'>Register Student Portal</h1>
          <br />
          <input
            className='w-[100%] bg-slate-200 placeholder-gray-500 outline-none border-none rounded-md pl-2 pt-1 pb-1 '
            type='text'
            placeholder='enter your full name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          /> <br /><br />
          <input
            className='w-[100%] bg-slate-200 placeholder-gray-500 outline-none border-none rounded-md pl-2 pt-1 pb-1 '
            type='text'
            placeholder='enter your phone number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /> <br /><br />
          <input
            className='w-[100%] bg-slate-200 placeholder-gray-500 outline-none border-none rounded-md pl-2 pt-1 pb-1 '
            type='text'
            placeholder='enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> <br /><br />
          <input
            className='w-[100%] placeholder-gray-500 bg-slate-200 outline-none border-none rounded-md pl-2 pt-1 pb-1 '
            type='password'
            placeholder='enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <br />

          <button className='w-[100%] pt-2 pb-2 rounded-lg text-white bg-blue-500 font-500 ' onClick={handleRegister}>{loading===true?'Loading....':'Register'}</button>
          <p onClick={() => setAuth((prev) => !prev)} className='text-gray-600 pt-3 pb-3 cursor-pointer'>click here to login</p>

        </div>
      </div>
    </>
  );
};

export default Register;
