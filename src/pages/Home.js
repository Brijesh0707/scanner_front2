import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Link } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Admin, setAdmin] = useState(false);
  const [lecture, setLecture] = useState(null);
  const [indexed, setIndexed] = useState(null);
  const [stater, setStater] = useState(false);
  const [data, setData] = useState(null);
  const [student2, setStudent2] = useState(null);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);
  const [scannerRunning, setScannerRunning] = useState(false); 
  const [loading1,setLoadin1]=useState(false)
  const [loading2,setLoadin2]=useState(false)
  const [loadin3,setLoadin3]=useState(false)

  const lectures = [
    "Java",
    "Python",
    "Computer Networking",
    "C++",
    "C",
    "Web Development",
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = async () => {
    setLoadin1(true)
    try {
      const response = await fetch("https://scanner-server.onrender.com/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailAddress: email, password: password }),
      });
      const res = await response.json();
      console.log(res);
      if (res?.student2?.emailAddress === "teacheradmin@gmail.com") {
        alert("Login Successfully");
        setLoadin1(false)
        setAdmin(true);
      } else {
        alert("not admin");
        setAdmin(false);
        setLoadin1(false)
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      setLoadin1(false)
      console.error(error);
    }
  };

  const handleSelect = (index, lectureName) => {
    setLecture(lectureName);
    setIndexed(index);
  };

  const handleEmpty = () => {
    setLecture(null);
    setIndexed(null);
  };

  const handleStudentData = async () => {
    setLoadin2(true)
    try {
      const response = await fetch(
        `https://scanner-server.onrender.com/v2/attend/userdata/qr/${data}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      console.log(res);
      setStudent2(res);
      setLoadin2(false)
    } catch (error) {
      setLoadin2(false)
      console.error("Error fetching student data:", error);
    }
  };

  const handlePresent = async () => {
    setLoadin3(true)
    try {
      const response = await fetch(
        "https://scanner-server.onrender.com/v2/attend/attendance",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            studentId: student2?._id,
            status: "present",
            remarks: lecture,
          }),
        }
      );
      setStudent2(null);
      setLoadin3(false)
      const res = await response.json();
      console.log(res);
      alert(res?.message);
    } catch (error) {
      console.log(error);
      setLoadin3(false)
    }
  };

  useEffect(() => {
    handleStudentData();
  }, [data]);

  const toggleScanner = () => {
    setStater(!stater);
    setScannerRunning(!scannerRunning);
  };

  return (
    <>
      <div className="w-[100%] h-[100%] admin_background relative">
        <p className="text-[20px] text-center md:absolute md:left-2 md:top-2 md:text-[13px] text-white font-[700]">
          Admin Attendance Portal
        </p>
        {Admin === true ? (
          <>
            <Link to="/attendence/table">
              <button className="w-[150px] pt-1 pb-1 bg-gray-700 border-slate-200 border-[1px] rounded-xl absolute top-2 right-2 text-white md:w-[100px] md:text-[10px] font-[500]">
                See Attendance
              </button>
            </Link>
          </>
        ) : (
          ""
        )}
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          {Admin === false ? (
            <div className="login flex justify-center items-center mt-[100px]">
              <div className="w-[100%] h-[100vh]">
                <div className="w-[400px] md:w-[300px] bg-slate-100 rounded-md pl-5 pr-5 pb-3 pt-3">
                  <h1 className="text-center font-[700] text-[20px]">
                    Login Admin Portal
                  </h1>
                  <br />
                  <input
                    className="w-[100%] bg-slate-200 placeholder-gray-500  outline-none border-none rounded-md pl-2 pt-1 pb-1"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <br />
                  <input
                    className="w-[100%] placeholder-gray-500 bg-slate-200  outline-none border-none rounded-md pl-2 pt-1 pb-1"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <br />
                  <p className="text-red-600 pb-3">{error}</p>
                  <button
                    className="w-[100%] pt-2 pb-2 rounded-lg text-white bg-blue-500  font-500"
                    onClick={handleLogin}
                  >
                    {loading1===true?'Loading...':'Login'}
                  </button>
                  <br />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[100%] h-[100%] mb-[400px] md:mt-10">
              <div className="w-[100%] h-[100%] flex justify-center mt-10 items-center">
                <div className="w-[50%] pb-3 md:w-[300px] md:pb-6 md:h-[100%] border-[1px] rounded-md  border-slate-400 h-[100%] pl-6 pr-6">
                  {stater === true ? (
                    <>
                      <div className="w-[100%]">
                        {isWideScreen ? (
                          <>
                            <QrReader
                              onResult={(result, error) => {
                                if (result) {
                                  setData(result.text);
                                }

                                if (error) {
                                  console.error(error);
                                }
                              }}
                              style={{ width: "100%" }}
                            />
                            {loading2===true?<><div class="spinner"></div></>:''

                            }
                            <p className="text-white">
                              Student Name :{" "}
                              <span className="text-white font-[600]">
                                {student2?.fullName}
                              </span>
                            </p>
                            {student2 !== null ? (
                              <>
                                <div className="flex justify-center mt-4 mb-3">
                                  <button
                                    onClick={handlePresent}
                                    className="w-[100%] pt-1 pb-1 rounded-md bg-blue-300 text-white font-[700]"
                                  >
                                    Present
                                  </button>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            <QrReader
                              key="environment"
                              constraints={{ facingMode: "environment" }}
                              onResult={(result, error) => {
                                if (result) {
                                  setData(result.text);
                                }

                                if (error) {
                                  console.error(error);
                                }
                              }}
                              style={{ width: "100%" }}
                            />
                           

                            {student2 !== null ? (
                              <>
                               {loadin3===true?<><div class="spinner"></div></>:''

                            }
                                <div className="flex justify-center">
                                  <button
                                    onClick={handlePresent}
                                    className="w-[100%] pt-1 pb-1 rounded-md bg-blue-300 text-white font-[700]"
                                  >
                                    Present
                                  </button>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="pb-2">
                      <p className="text-center text-white text-[20px] font-[600]">
                        Select Lecture And Scan Student Qr Code And Take
                        Attendance
                      </p>
                      <br />
                      {lectures.map((item, index) => (
                        <div
                          key={index}
                          className={`w-[100%] cursor-pointer h-[30px] mt-2 mb-2 hover:bg-slate-400 bg-slate-500 rounded-md`}
                          onClick={() => handleSelect(index, item)}
                          style={{
                            backgroundColor:
                              index === indexed
                                ? "rgba(255, 255, 255, var(--tw-text-opacity))"
                                : "",
                          }}
                        >
                          <p className="text-white font-[600] pl-5">{item}</p>
                        </div>
                      ))}
                      <button
                        className="w-[100px] pt-2 pb-2 rounded-md bg-blue-500 text-white"
                        onClick={handleEmpty}
                      >
                        clear
                      </button>
                    </div>
                  )}

                  {lecture === null ? (
                    ""
                  ) : (
                    <button
                      onClick={toggleScanner} // Toggle scanner on/off
                      className="w-[100%] mt-5 pt-2 pb-2 bg-red-400 text-white font-[600]"
                    >
                      {stater ? "Stop Scanner" : "Start Scanner"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
