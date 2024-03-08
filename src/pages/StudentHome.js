import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

const StudentHome = () => {
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState(null);
    const [email, setEmail] = useState("");
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://scanner-server.onrender.com/v2/attend/userdata/${user_id}`);
                const userData = await response.json();
                setStudent(userData);
                setLoading(false);
                setEmail(userData?.emailAddress || "");
            } catch (error) {
                console.log(error);
                setStudent(null)
                setLoading(false);
            }
        };

        if (user_id) {
            fetchUserData();
        }
    }, [user_id]);

    const handleLogout =()=>{
        localStorage.removeItem("user_id")
        window.location.reload()
    }

    return (
        <>
  
        <div className='w-full h-screen background_image flex flex-col justify-center items-center'>
        <h1 className='text-white text-4xl mb-8 absolute top-2 text_style md:text-[20px] md:left-2'>Student Portal</h1>  
        <button onClick={handleLogout} className='w-[100px] pt-1 pb-1 bg-red-500 font-[500] text-white rounded-lg absolute top-2 right-2'>Logout</button>
            {loading ? (
                <p className='text-white'>Loading.......</p>
            ) : (
                <div className='flex md:mt-[40px] flex-col items-center w-[400px] md:w-[310px] md:border-none pt-2 pb-2 pl-2 pr-2 rounded-md border-[1px] border-slate-300'>
                    <div className='w-72 h-72 mb-4'>
                        <QRCode value={email} size={280} />
                    </div>
                    <div className='text-white mt-10'>
                        <p><span className='font-bold'>Student Name:</span> {student?.fullName}</p>
                        <p><span className='font-bold'>Student Email:</span> {student?.emailAddress}</p>
                        <p><span className='font-bold'>Student Phone Number:</span> {student?.phoneNumber}</p>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default StudentHome;
