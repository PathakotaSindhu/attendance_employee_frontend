import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [lastLoginStatus, setLastLoginStatus] = useState({});
  const [loginLogoutCounts, setLoginLogoutCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date

  // Fetch attendance data from backend
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
      // const response = await axios.get('http://localhost:8080/admin/attendance/today'); 
         const response = await axios.get('https://employee-attendance-31ex.onrender.com/admin/attendance/today'); 
       
      console.log('Fetched Attendance Data:', response.data); 

        // NEW: Filter data to get the most recent attendance record for each user
      const uniqueUserAttendance = {};

      response.data.forEach((record) => {
        const userId = record.user?.id;
        if (userId) {
          const currentRecordTime = new Date(record.loginTime || record.logoutTime);

          // NEW: Check if we already have a record for this user and if this record is more recent
          if (!uniqueUserAttendance[userId] || currentRecordTime > new Date(uniqueUserAttendance[userId].time)) {
            uniqueUserAttendance[userId] = {
              ...record, 
              time: currentRecordTime, 
              loginOption: record.loginOption || 'N/A', // Ensuring we have a loginOption in the record
            };
          }
        }
      });

      // NEW: Convert the object back to an array of unique records (most recent for each user)
      const distinctAttendance = Object.values(uniqueUserAttendance);
       setAttendanceData(distinctAttendance); 

       // Reprocess last login status and login/logout counts with distinct attendance data
      processLastLoginStatus(distinctAttendance);
      calculateLoginLogoutCounts(response.data);
        setLoading(false); // Mark loading as false
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to load attendance data.');
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const fetchAttendanceByDate = async () => {
    if (!selectedDate) return;
  
    try {
      // const response = await axios.get(`http://localhost:8080/admin/attendance/date?date=${selectedDate}`);
        const response = await axios.get(`https://employee-attendance-31ex.onrender.com/admin/attendance/date?date=${selectedDate}`);
      console.log('Fetched Attendance Data for selected date:', response.data);
  
      // NEW: Filter data to get the most recent attendance record for each user
      const uniqueUserAttendance = {};
  
      response.data.forEach((record) => {
        const userId = record.user?.id;
        if (userId) {
          const currentRecordTime = new Date(record.loginTime || record.logoutTime);
  
          // Check if we already have a record for this user and if this record is more recent
          if (!uniqueUserAttendance[userId] || currentRecordTime > new Date(uniqueUserAttendance[userId].time)) {
            uniqueUserAttendance[userId] = {
              ...record, 
              time: currentRecordTime, 
              loginOption: record.loginOption || 'N/A', // Ensuring we have a loginOption in the record
            };
          }
        }
      });
  
      // Convert the object back to an array of unique records (most recent for each user)
      const distinctAttendance = Object.values(uniqueUserAttendance);
  
      // Fetch duration for each user on the selected date
      const updatedAttendanceData = await Promise.all(
        distinctAttendance.map(async (record) => {
          const userId = record.user?.id;
          if (userId) {
            try {
              const durationResponse = await axios.get(
                 //`http://localhost:8080/admin/attendance/duration?userId=${userId}&date=${selectedDate}`
                   `https://employee-attendance-31ex.onrender.com/admin/attendance/duration?userId=${userId}&date=${selectedDate}`
              );
              const duration = durationResponse.data || 'N/A';
              return { ...record, duration }; // Add duration to each record
            } catch (err) {
              console.error('Error fetching duration:', err);
              return { ...record, duration: 'N/A' };
            }
          }
          return { ...record, duration: 'N/A' };
        })
      );
  
      setAttendanceData(updatedAttendanceData); // Update attendance data with duration
  
      // Reprocess last login status and login/logout counts with distinct attendance data
      processLastLoginStatus(updatedAttendanceData);
      calculateLoginLogoutCounts(response.data);
  
    } catch (err) {
      console.error('Error fetching attendance data for the selected date:', err);
      setError('Failed to load attendance data for the selected date.');
    }
  };
  
  const processLastLoginStatus = (data) => {
    const lastLogin = {};

    const calculateDuration = (loginTime, logoutTime) => {
      if (!loginTime || !logoutTime) return "N/A";
  
      const start = new Date(loginTime);
      const end = new Date(logoutTime);
  
      const diffInMilliseconds = end - start;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  
      const hours = Math.floor(diffInMinutes / 60); //Get hours
      const minutes = diffInMinutes % 60; //Get remaining minutes
  
      return `${hours} hrs ${minutes} mins`;
    };

    data.forEach((record) => {
      const userId = record.user?.id;
      if (userId) {
        const loginTime = record.loginTime ? new Date(record.loginTime) : null;
        const logoutTime = record.logoutTime ? new Date(record.logoutTime) : null;

        //Calculate the most recent login or logout time
        const mostRecentTime = logoutTime && loginTime
        ? (logoutTime > loginTime ? logoutTime : loginTime)
        : loginTime || logoutTime;

        if (!lastLogin[userId] || mostRecentTime > new Date(lastLogin[userId].time)) {
          lastLogin[userId] = {
            loginOption: mostRecentTime === logoutTime ? 'Logout' : record.loginOption,
            time: mostRecentTime,
            duration: calculateDuration(record.loginTime, record.logoutTime), //Calculate duration
          };
        }
      }
    });

    setLastLoginStatus(lastLogin);
  };

  const calculateLoginLogoutCounts = (data) => {
    const counts = {};

    data.forEach((record) => {
      const userId = record.user?.id;
      if (userId) {
        counts[userId] = (counts[userId] || 0) + 1;
      }
    });

    setLoginLogoutCounts(counts);
  };


  if (loading) return <p style={{ textAlign: 'center', color: '#555', fontSize: '18px' }}>Loading attendance data...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans pb-20">
      <Header />
      <div className="flex items-center justify-between mb-2  space-x-4 w-full">
      <h2 className="text-3xl font-bold text-left text-gray-800 ">Attendance Report</h2>

      {/* Date Input and Fetch Button */}
      
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 max-w-xs text-lg border border-gray-300 rounded-md mr-4"
          />
          <button
            onClick={fetchAttendanceByDate}
            className="px-4 py-2 max-w-xs bg-green-500 text-white text-lg font-medium rounded-md hover:bg-green-600"
          >
           Search
          </button>
        </div>
        </div>
    

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg border-collapse">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border border-gray-300 px-4 py-3 text-left">S.No</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Phone</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Time</th>
              {selectedDate && (
                <th className="border border-gray-300 px-4 py-3 text-left">Duration</th>
              )}
              {/* <th className="border border-gray-300 px-4 py-3 text-left">Duration</th> */}
              <th className="border border-gray-300 px-4 py-3 text-left">Total Login-Logout Count</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-3">{attendance.user?.name || 'No Name'}</td>
                <td className="border border-gray-300 px-4 py-3">{attendance.user?.phoneNumber || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-3">{lastLoginStatus[attendance.user?.id]?.loginOption || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-3">
                  {lastLoginStatus[attendance.user?.id]?.time
                    ? new Date(lastLoginStatus[attendance.user?.id].time).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : 'N/A'}
                </td>
                {selectedDate && (
                  // <td className="border border-gray-300 px-4 py-3">
                  //   {lastLoginStatus[attendance.user?.id]?.duration || 'N/A'}
                  // </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {attendance.duration || 'N/A'}
                  </td>
                )}
                <td className="border border-gray-300 px-4 py-3">{loginLogoutCounts[attendance.user?.id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <footer
        className="bg-gray-700 text-white text-center py-4"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#333", // Ensure footer background color matches
        }}
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AppteKnow Careers. All rights reserved.
        </p>
        <p className="text-sm">Designed and developed by GRID R&D</p>
      </footer>
    </div>
  );
};

export default ViewAttendance;
