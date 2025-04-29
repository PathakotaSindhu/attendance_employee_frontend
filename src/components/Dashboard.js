

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {
  FaUsers,
  FaUserClock,
  FaCalendarCheck,
  FaExclamationTriangle,
} from 'react-icons/fa';
import StatCard from './StatCard';
import Header from './Header';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();

  const [totalStudents, setTotalStudents] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [onLeave, setOnLeave] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [attendanceData, setAttendanceData] = useState({
    labels: [],
    datasets: [],
  });

  const [monthlyData, setMonthlyData] = useState({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Present',
        data: [120, 130, 140, 150],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Absent',
        data: [30, 25, 20, 15],
        backgroundColor: 'rgba(251, 191, 36, 0.5)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchTotalStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/employees/count', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTotalStudents(data.total ? data.total - 1 : 0);
      } catch (error) {
        setTotalStudents(0);
      }
    };

    const fetchPresentToday = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/attendance/count/today", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPresentToday(data.total || 0);
      } catch (error) {
        console.error("Error fetching present today:", error);
      }
    };

    const fetchOnLeaveCount = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/attendance/count/today', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setOnLeave(data.total || 0);
      } catch (error) {
        setOnLeave(0);
      }
    };

    const fetchAbsentCount = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/attendance/absent-today', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const adjustedCount = Math.max(0, (data || 0) - 1);
        setAbsentCount(adjustedCount);
      } catch (error) {
        setAbsentCount(0);
      }
    };

    const fetchWeeklyReport = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/weekly-report', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        // Create an object mapping each day of the week to data
        const dayMap = {};
        data.forEach(entry => {
          const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' });
          //dayMap[day] = entry;
          dayMap[day] = {
            ...entry,
            absent: Math.max(0, (entry.absent || 0) - 1), // Subtract 1 to exclude admin
          };
          
        });

        const todayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat'];
       // const displayDays = weekdays.slice(0, Math.min(todayIndex, 5)); // Ensure up to today (Mon–Fri only)
       const displayDays = weekdays.slice(0, 6); // Always show Mon to Sat

        const present = displayDays.map(day => (dayMap[day]?.present || 0));
        const absent = displayDays.map(day => (dayMap[day]?.absent || 0));

        setAttendanceData({
          labels: displayDays,
          datasets: [
            {
              label: 'Present',
              data: present,
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
              borderColor: 'rgb(34, 197, 94)',
              borderWidth: 1,
            },
            {
              label: 'Absent',
              data: absent,
              backgroundColor: 'rgba(239, 68, 68, 0.5)',
              borderColor: 'rgb(239, 68, 68)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching weekly report:', error);
      }
    };

    fetchTotalStudents();
    fetchPresentToday();
    fetchOnLeaveCount();
    fetchAbsentCount();
    fetchWeeklyReport();
  }, []);

  const handleBarClick = (event, elements) => {
    if (!elements.length) return;
    const index = elements[0].index;
    const day = attendanceData.labels[index];
    const type = elements[0].datasetIndex === 0 ? 'Present' : 'Absent';
    alert(`View all ${type} candidates for ${day}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="bg-white p-4 shadow flex justify-center gap-4">
        <button onClick={() => navigate('/candidates')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Candidates</button>
        <button onClick={() => navigate('/view-attendance')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Attendance</button>
        <button onClick={() => navigate('/absentees')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Absentees</button>
        <button onClick={() => navigate('/Leaves')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Leaves</button>
      </div>

      <div className="flex-grow px-4 py-4 overflow-y-auto">
        <div className="text-3xl font-bold mb-6 text-gray-800">Welcome to the Dashboard</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Students" value={totalStudents} icon={FaUsers} color="border-blue-500" />
          <StatCard title="Present Today" value={presentToday} icon={FaUserClock} color="border-green-500" />
          <StatCard title="On Leave" value={onLeave} icon={FaCalendarCheck} color="border-purple-500" />
          <StatCard title="Absent Today" value={absentCount} icon={FaExclamationTriangle} color="border-red-500" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6" style={{ maxHeight: '300px' }}>
          <h2 className="text-lg font-semibold mb-2">Weekly Attendance Overview</h2>
          <Bar
            data={attendanceData}
            options={{
              onClick: handleBarClick,
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'top' }, title: { display: false } },
            }}
            height={200}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Monthly Attendance Overview</h2>
          <Bar
            data={monthlyData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'top' }, title: { display: false } },
            }}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
