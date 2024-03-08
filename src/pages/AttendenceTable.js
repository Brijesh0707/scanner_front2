import React, { useState } from 'react';

const AttendenceTable = () => {
  const lectures = [
    "Java",
    "Python",
    "Computer Networking",
    "C++",
    "C",
    "Web Development",
  ];

  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://scanner-server.onrender.com/v2/attend/attendance/${date}/${subject}`);
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error(error);
      setAttendanceData(null);
    }
    setLoading(false);
  };

  return (
    <div className='attendence_bg w-[100%] h-[100vh]'>
      <div className='flex justify-center mt-4'>
        <div className='flex items-center gap-5 md:flex-wrap mt-[30px]'>
          <div>
            <label htmlFor="subject" className='text-white font-[600] pr-2'>Select Subject: </label>
            <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">Select Subject</option>
              {lectures.map((lecture, index) => (
                <option key={index} value={lecture}>{lecture}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className='text-white font-[600] pr-2'>Select Date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <button className='w-[100px] pt-1 pb-1 bg-blue-300 rounded-md' onClick={handleSearch}>Search</button>
        </div>
      </div>
     
      <div className='flex justify-center mt-10'>
        {loading ? (
          <p className='text-white font-[600]'>Loading...</p>
        ) : (
          attendanceData && attendanceData.length > 0 ? (
            <table className='border-[1px] w-[80%]'>
              <thead className='text-black font-[700] border-[1px] bg-blue-300'>
                <tr>
                  <th>Student Name</th>
                  <th>Status</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody className='text-center text-white font-[500]'>
                {attendanceData.map((attendance, index) => (
                  <tr key={index} className='border-[1px] cursor-pointer hover:bg-slate-300'>
                    <td>{attendance.student.fullName}</td>
                    <td>{attendance.status}</td>
                    <td>{attendance.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-[20px] text-white font-[600]'>No result found</p>
          )
        )}
      </div>
    </div>
  );
};

export default AttendenceTable;
