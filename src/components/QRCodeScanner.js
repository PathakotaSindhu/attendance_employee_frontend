/*import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import logo from './nictlogo.jpg'; // Update the path to your logo

const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const [instituteName, setInstituteName] = useState('');
    const [scanComplete, setScanComplete] = useState(false);
    const [warningMessage, setWarningMessage] = useState(''); // Warning message state
    const isProcessingRef = useRef(false); // Ref to prevent multiple API calls
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');

    useEffect(() => {
        if (!userId) {
            setError('You need to log in before scanning the QR code.');
            navigate('/login');
        }
    }, [navigate, userId]);

    const handleScan = async (result) => {
        if (result && !isProcessingRef.current) {
            isProcessingRef.current = true; // Prevent further processing
            setScanComplete(true);

            try {
                const data = JSON.parse(result.text);
                const { location, institutename } = data;

                if (location && institutename) {
                    setInstituteName(institutename);
                    const instituteId = await fetchInstituteId(institutename);
                    if (instituteId) {
                        await determineAttendanceAction(instituteId);
                    } else {
                        setError('Institute details not found. Please try again.');
                        resetScanner();
                    }
                } else {
                    setError('Invalid QR code: Missing required information.');
                    resetScanner();
                }
            } catch (err) {
                console.error('Error parsing QR code data:', err);
                setError('Invalid QR code format.');
                resetScanner();
            }
        }
    };

    const handleError = (error) => {
        console.error('QR Code scanning error:', error);
        setError('Unable to access camera or scan QR code');
    };

    const fetchInstituteId = async (instituteName) => {
        try {
                // const response = await axios.get('https://final-attendance.onrender.com/api/institute/id', {
                const response = await axios.get('http://localhost:8080/api/institute/id', {
                params: { instituteName },
            });
            console.log('Institute ID fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching institute ID:', error);
            setError('Unable to fetch institute details.');
            return null;
        }
    };

    const determineAttendanceAction = async (instituteId) => {
        try {
            //  const response = await axios.post('https://final-attendance.onrender.com/api/attendance/determine', { userId });
              const response = await axios.post('http://localhost:8080/api/attendance/determine', { userId });
            const { loginOption } = response.data;

            if (loginOption === 'login') {
                await markAttendance(userId, instituteId, 'login');
            } else if (loginOption === 'logout') {
                navigate(`/remark/${userId}/${instituteId}`);
            } else {
                setError('Unable to determine attendance action.');
                resetScanner();
            }
        } catch (error) {
            console.error('Error determining attendance action:', error);
            setError('Error determining attendance action. Please try again.');
            resetScanner();
        }
    };

    const markAttendance = async (userId, instituteId, loginOption) => {
        try {
            const attendanceData = {
                user: { id: userId },
                loginOption,
                instituteId,
            };
            // await axios.post('https://final-attendance.onrender.com/api/attendance/add', attendanceData);
            await axios.post('http://localhost:8080/api/attendance/mark'  , attendanceData);
            navigate('/login-success');
        } catch (error) {
            console.error('Error marking attendance:', error);
            setError('Error marking attendance. Please try again.');
            resetScanner();
        }
    };

    const resetScanner = () => {
        isProcessingRef.current = false; // Reset processing state
        setScanComplete(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
           
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <img src={logo} alt="AppteKnow Logo" className="w-24 h-16 sm:w-32  sm:h-20 md:w-40 md:h-24 object-contain" />
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
                  NICT COMPUTERS - Your Job is Our Success
                </h1>
            </div>

            <div className="flex justify-center items-center py-8 px-4 sm:px-6 md:px-8">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto transition-all ease-in-out transform hover:scale-105">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center text-teal-700">QR Code Scanner</h2>

                    {error && (
                        <p className="text-red-500 mb-6 text-center font-semibold">{error}</p>
                    )}
                    {warningMessage && (
                        <p className="text-yellow-500 font-bold text-center mt-4">
                            {warningMessage}
                        </p>
                    )}

                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl">
                        {!scanComplete ? (
                            <QrReader
                                onResult={handleScan}
                                onError={handleError}
                                constraints={{
                                    facingMode: "environment", // Specifies the back camera
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <p className="text-center text-gray-600">Processing your scan...</p>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80"></div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-lg sm:text-xl text-gray-700 font-semibold">Ensure you're within the institute's premises to scan the code.</p>
                        <p className="text-sm text-gray-500 mt-2">If you face any issues, please contact support.</p>
                    </div>
                </div>
            </div>

            
            <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
                <p className="text-sm sm:text-base">
                    &copy; {new Date().getFullYear()} NICT COMPUTER EDUCATION. All rights reserved.
                </p>
                <p className="text-sm sm:text-base">
                    Designed and developed by SINDHU TEAM
                </p>
            </footer>
        </div>
    );
};

export default QRCodeScanner;*/
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { QrReader } from 'react-qr-reader';
// import axios from 'axios';
// import logo from './nictlogo.jpg'; // Update if the logo path changes

// const QRCodeScanner = () => {
//     const [error, setError] = useState(null);
//     const [instituteName, setInstituteName] = useState('');
//     const [scanComplete, setScanComplete] = useState(false);
//     const [warningMessage, setWarningMessage] = useState('');
//     const [employeeId, setEmployeeId] = useState(null);
//     const isProcessingRef = useRef(false);
//     const navigate = useNavigate();

//     // ✅ Load employeeId safely after mount
//     useEffect(() => {
//         const id = localStorage.getItem('employeeId');
//         if (id) {
//             setEmployeeId(id);
//         } //else {
//             //setError('You need to log in before scanning the QR code.');
//             //navigate('/login');
//        // }
//     }, [navigate]);

//     const handleScan = async (result) => {
//         if (result?.text && !isProcessingRef.current) {
//             isProcessingRef.current = true;
//             setScanComplete(true);

//             try {
//                 const data = JSON.parse(result.text);
//                 const { location, institutename } = data;

//                 if (location && institutename) {
//                     setInstituteName(institutename);
//                     const instituteId = await fetchInstituteId(institutename);
//                     if (instituteId) {
//                         await markAttendance(employeeId, instituteId);
//                     } else {
//                         setError('Institute details not found. Please try again.');
//                         resetScanner();
//                     }
//                 } else {
//                     setError('Invalid QR code: Missing required information.');
//                     resetScanner();
//                 }
//             } catch (err) {
//                 console.error('Error parsing QR code data:', err);
//                 setError('Invalid QR code format.');
//                 resetScanner();
//             }
//         }
//     };

//     const handleError = (error) => {
//         console.error('QR Code scanning error:', error);
//         setError('Unable to access camera or scan QR code');
//     };

//     const fetchInstituteId = async (instituteName) => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/institute/id', {
//                 params: { instituteName },
//             });
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching institute ID:', error);
//             setError('Unable to fetch institute details.');
//             return null;
//         }
//     };

//     const markAttendance = async (employeeId, instituteId) => {
//         try {
//             const attendanceData = {
//                 employeeId,
//                 instituteId
//             };

//             const response = await axios.post('http://localhost:8080/api/attendance/mark', attendanceData);
//             console.log('Attendance marked:', response.data);

//             navigate('/login-success'); // Success page
//         } catch (error) {
//             console.error('Error marking attendance:', error);
//             setError('Error marking attendance. Please try again.');
//             resetScanner();
//         }
//     };

//     const resetScanner = () => {
//         isProcessingRef.current = false;
//         setScanComplete(false);
//     };

//     return (
//         <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
//             <div className="flex items-center justify-between p-4 bg-white shadow-md">
//                 <img src={logo} alt="NICT Logo" className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain" />
//                 <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
//                     NICT COMPUTERS - Your Job is Our Success
//                 </h1>
//             </div>

//             <div className="flex justify-center items-center py-8 px-4 sm:px-6 md:px-8">
//                 <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto transition-all ease-in-out transform hover:scale-105">
//                     <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center text-teal-700">QR Code Scanner</h2>

//                     {error && (
//                         <p className="text-red-500 mb-6 text-center font-semibold">{error}</p>
//                     )}
//                     {warningMessage && (
//                         <p className="text-yellow-500 font-bold text-center mt-4">
//                             {warningMessage}
//                         </p>
//                     )}

//                     <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl">
//                         {!scanComplete ? (
//                             <QrReader
//                                 onResult={handleScan}
//                                 onError={handleError}
//                                 constraints={{ facingMode: 'environment' }}
//                                 style={{
//                                     width: '100%',
//                                     height: '100%',
//                                     objectFit: 'cover',
//                                 }}
//                             />
//                         ) : (
//                             <p className="text-center text-gray-600">Processing your scan...</p>
//                         )}
//                         <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80"></div>
//                     </div>

//                     <div className="mt-8 text-center">
//                         <p className="text-lg sm:text-xl text-gray-700 font-semibold">
//                             Ensure you're within the institute's premises to scan the code.
//                         </p>
//                         <p className="text-sm text-gray-500 mt-2">
//                             If you face any issues, please contact support.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
//                 <p className="text-sm sm:text-base">
//                     &copy; {new Date().getFullYear()} NICT COMPUTER EDUCATION. All rights reserved.
//                 </p>
//                 <p className="text-sm sm:text-base">
//                     Designed and developed by SINDHU TEAM
//                 </p>
//             </footer>
//         </div>
//     );
// };

// export default QRCodeScanner;

/*import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import logo from './nictlogo.jpg';

const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const [instituteName, setInstituteName] = useState('');
    const [scanComplete, setScanComplete] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const isProcessingRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('employeeId');
        if (id) {
            setEmployeeId(id);
        } //else {
           // setError('Please log in to scan the QR code.');
           // navigate('/login');
        //}
    }, [navigate]);

    const handleScan = async (result) => {
        if (!result || isProcessingRef.current) return;

        const scannedText = result?.text || result?.data;
        if (!scannedText) return;

        isProcessingRef.current = true;
        setScanComplete(true);

        console.log("Scanned QR Data:", scannedText);

        try {
            const data = JSON.parse(scannedText);
            const { location, institutename } = data;

            if (location && institutename) {
                setInstituteName(institutename);
                const instituteId = await fetchInstituteId(institutename);
                if (instituteId) {
                    await markAttendance(employeeId, instituteId);
                } else {
                    setError('Institute not found.');
                    resetScanner();
                }
            } else {
                setError('Invalid QR code format.');
                resetScanner();
            }
        } catch (err) {
            console.error('QR Parse Error:', err);
            setError('Failed to parse QR code.');
            resetScanner();
        }
    };

    const handleError = (err) => {
        console.error('QR Scanner Error:', err);
        setError('Camera access issue or device not supported.');
    };

    const fetchInstituteId = async (instituteName) => {
        try {
            const response = await axios.get('http://localhost:8080/api/institute/id', {
                params: { instituteName }
            });
            return response.data;
        } catch (err) {
            console.error('Institute Fetch Error:', err);
            setError('Could not fetch institute ID.');
            return null;
        }
    };

    const markAttendance = async (employeeId, instituteId) => {
        try {
            const attendanceData = { employeeId, instituteId };
            const response = await axios.post('http://localhost:8080/api/attendance/mark', attendanceData);
            console.log('Attendance marked:', response.data);
            navigate('/login-success');
        } catch (err) {
            console.error('Attendance Error:', err);
            setError('Could not mark attendance.');
            resetScanner();
        }
    };

    const resetScanner = () => {
        isProcessingRef.current = false;
        setScanComplete(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <img src={logo} alt="NICT Logo" className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 object-contain" />
                <h1 className="text-lg sm:text-2xl font-semibold text-teal-700 mx-auto text-center">
                    NICT COMPUTERS - Your Job is Our Success
                </h1>
            </div>

            <div className="flex justify-center items-center py-8 px-4 sm:px-6 md:px-8">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto transition-all ease-in-out transform hover:scale-105">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center text-teal-700">QR Code Scanner</h2>

                    {error && <p className="text-red-500 mb-6 text-center font-semibold">{error}</p>}

                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl">
                        {!scanComplete ? (
                            <QrReader
                                constraints={{ video: { facingMode: "environment" } }}
                                onResult={handleScan}
                                onError={handleError}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <p className="text-center text-gray-600">Processing your scan...</p>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80"></div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-lg sm:text-xl text-gray-700 font-semibold">
                            Ensure you're within the institute's premises to scan the code.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            If you face any issues, please contact support.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
                <p className="text-sm sm:text-base">
                    &copy; {new Date().getFullYear()} NICT COMPUTER EDUCATION. All rights reserved.
                </p>
                <p className="text-sm sm:text-base">
                    Designed 
                </p>
            </footer>
        </div>
    );
};

export default QRCodeScanner;*/

/*import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import logo from './nictlogo.jpg';

const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const [scanComplete, setScanComplete] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const isProcessingRef = useRef(false);
    const navigate = useNavigate();

    const PERMITTED_RADIUS = 0.005; // roughly 500m (in degrees)

    useEffect(() => {
        const id = localStorage.getItem('employeeId');
        if (id) setEmployeeId(id);
    }, []);

    const getCurrentLocation = () =>
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(error)
            );
        });

    const isWithinLocation = async (targetLat, targetLng) => {
        try {
            const coords = await getCurrentLocation();
            const latDiff = Math.abs(coords.latitude - targetLat);
            const lngDiff = Math.abs(coords.longitude - targetLng);
            return latDiff <= PERMITTED_RADIUS && lngDiff <= PERMITTED_RADIUS;
        } catch (error) {
            console.error('Geolocation Error:', error);
            setError('Unable to access your location.');
            return false;
        }
    };

    const handleScan = async (result) => {
        if (!result || isProcessingRef.current) return;

        const scannedText = result?.text || result?.data;
        if (!scannedText) return;

        isProcessingRef.current = true;
        setScanComplete(true);
        console.log("Scanned QR Data:", scannedText);

        try {
            const data = JSON.parse(scannedText);
            const { location, institutename } = data;

            if (location && institutename) {
                const { latitude, longitude } = location;
                const isInLocation = await isWithinLocation(latitude, longitude);

                if (!isInLocation) {
                    setError("❌ You must be within the institute's premises.");
                    resetScanner();
                    return;
                }

                const instituteId = await fetchInstituteId(institutename);
                if (instituteId) {
                    await markAttendance(employeeId, instituteId);
                } else {
                    setError('Institute not found.');
                    resetScanner();
                }
            } else {
                setError('Invalid QR code format.');
                resetScanner();
            }
        } catch (err) {
            console.error('QR Parse Error:', err);
            setError('Failed to parse QR code.');
            resetScanner();
        }
    };

    const fetchInstituteId = async (instituteName) => {
        try {
            const response = await axios.get('http://localhost:8080/api/institute/id', {
                params: { instituteName }
            });
            return response.data;
        } catch (err) {
            console.error('Institute Fetch Error:', err);
            setError('Could not fetch institute ID.');
            return null;
        }
    };

    const markAttendance = async (employeeId, instituteId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/attendance/mark', {
                employeeId,
                instituteId
            });

            const attendanceType = response.data.attendanceType;

            if (attendanceType === "Login") {
                navigate('/login-success');
            } else if (attendanceType === "Logout") {
                // Optionally store remarks or time if needed
                navigate('/logout-success');
            } else {
                setError("Unknown attendance type received.");
                resetScanner();
            }
        } catch (err) {
            console.error('Attendance Error:', err);
            setError('Could not mark attendance.');
            resetScanner();
        }
    };

    const handleError = (err) => {
        console.error('QR Scanner Error:', err);
        setError('Camera access issue or device not supported.');
    };

    const resetScanner = () => {
        isProcessingRef.current = false;
        setScanComplete(false);
        setTimeout(() => setError(null), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <img src={logo} alt="NICT Logo" className="w-24 h-16 object-contain" />
                <h1 className="text-lg font-semibold text-teal-700 mx-auto text-center">
                    NICT COMPUTERS - Your Job is Our Success
                </h1>
            </div>

            <div className="flex justify-center items-center py-8 px-4">
                <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg mx-auto transform hover:scale-105 transition-all">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center text-teal-700">QR Code Scanner</h2>

                    {error && <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>}

                    <div className="relative w-full h-[350px] overflow-hidden rounded-xl">
                        {!scanComplete ? (
                            <QrReader
                                constraints={{ video: { facingMode: "environment" } }}
                                onResult={handleScan}
                                onError={handleError}
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <p className="text-center text-gray-600">Processing your scan...</p>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80" />
                    </div>

                    <p className="mt-6 text-center text-gray-700 font-semibold">
                        Ensure you're within the institute's premises to scan the code.
                    </p>
                </div>
            </div>

            <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
                <p className="text-sm">&copy; {new Date().getFullYear()} NICT COMPUTER EDUCATION. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default QRCodeScanner;*/

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import logo from './nictlogo.jpg';

const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const [scanComplete, setScanComplete] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const isProcessingRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('employeeId');
        if (id) setEmployeeId(id);
    }, []);

    const getCurrentLocation = () =>
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(error)
            );
        });

    const isWithinLocation = async (targetLat, targetLng) => {
        try {
            const coords = await getCurrentLocation();

            const isExactMatch =
                coords.latitude.toFixed(6) === targetLat.toFixed(6) &&
                coords.longitude.toFixed(6) === targetLng.toFixed(6);

            if (!isExactMatch) {
                setError("❌ You must be exactly at the institute's location.");
            }

            return isExactMatch;
        } catch (error) {
            console.error('Geolocation Error:', error);
            setError('Unable to access your location.');
            return false;
        }
    };

    const handleScan = async (result) => {
        if (!result || isProcessingRef.current) return;

        const scannedText = result?.text || result?.data;
        if (!scannedText) return;

        isProcessingRef.current = true;
        setScanComplete(true);
        console.log("Scanned QR Data:", scannedText);

        try {
            const data = JSON.parse(scannedText);
            const { location, institutename } = data;

            if (location && institutename) {
                const { latitude, longitude } = location;
                const isInLocation = await isWithinLocation(latitude, longitude);

                if (!isInLocation) {
                    resetScanner();
                    return;
                }

                const instituteId = await fetchInstituteId(institutename);
                if (instituteId) {
                    await markAttendance(employeeId, instituteId);
                } else {
                    setError('Institute not found.');
                    resetScanner();
                }
            } else {
                setError('Invalid QR code format.');
                resetScanner();
            }
        } catch (err) {
            console.error('QR Parse Error:', err);
            setError('Failed to parse QR code.');
            resetScanner();
        }
    };

    const fetchInstituteId = async (instituteName) => {
        try {
            const response = await axios.get('https://employee-attendance-31ex.onrender.com/api/institute/id', {
            // const response = await axios.get('http://localhost:8080/api/institute/id', {
                params: { instituteName }
            });
            return response.data;
        } catch (err) {
            console.error('Institute Fetch Error:', err);
            setError('Could not fetch institute ID.');
            return null;
        }
    };

    const markAttendance = async (employeeId, instituteId) => {
        try {
            const response = await axios.post('https://employee-attendance-31ex.onrender.com/api/attendance/mark', {
            //const response = await axios.post('http://localhost:8080/api/attendance/mark', {    
                employeeId,
                instituteId
            });

            const attendanceType = response.data.attendanceType;

            if (attendanceType === "Login") {
                navigate('/login-success');
            } else if (attendanceType === "Logout") {
                navigate('/remark/:userId/:instituteId');
            } else {
                setError("Unknown attendance type received.");
                resetScanner();
            }
        } catch (err) {
            console.error('Attendance Error:', err);
            setError('Could not mark attendance.');
            resetScanner();
        }
    };

    const handleError = (err) => {
        console.error('QR Scanner Error:', err);
        setError('Camera access issue or device not supported.');
    };

    const resetScanner = () => {
        isProcessingRef.current = false;
        setScanComplete(false);
        setTimeout(() => setError(null), 5000); // error message clears after 5s
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <img src={logo} alt="NICT Logo" className="w-24 h-16 object-contain" />
                <h1 className="text-lg font-semibold text-teal-700 mx-auto text-center">
                    NICT COMPUTERS - Your Job is Our Success
                </h1>
            </div>

            <div className="flex justify-center items-center py-8 px-4">
                <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg mx-auto transform hover:scale-105 transition-all">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center text-teal-700">QR Code Scanner</h2>

                    {error && <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>}

                    <div className="relative w-full h-[350px] overflow-hidden rounded-xl">
                        {!scanComplete ? (
                            <QrReader
                                constraints={{ video: { facingMode: "environment" } }}
                                onResult={handleScan}
                                onError={handleError}
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <p className="text-center text-gray-600">Processing your scan...</p>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-xl pointer-events-none opacity-80" />
                    </div>

                    <p className="mt-6 text-center text-gray-700 font-semibold">
                        Ensure you're within the institute's premises to scan the code.
                    </p>
                </div>
            </div>

            <footer className="bg-teal-700 text-white text-center py-4 mt-auto">
                <p className="text-sm">&copy; {new Date().getFullYear()} NICT COMPUTER EDUCATION. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default QRCodeScanner;


