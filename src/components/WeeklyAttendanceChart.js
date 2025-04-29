import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyAttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState({
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Login',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Logout',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchWeeklyAttendanceData();
  }, []);

  const fetchWeeklyAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/weekly?startDate=2025-04-15&endDate=2025-04-22');
      const data = await response.json();
      console.log('Fetched weekly data:', data);

      const loginCount = [0, 0, 0, 0, 0]; // For Monday to Friday
      const logoutCount = [0, 0, 0, 0, 0];

      // Process the data
      data.forEach(item => {
        const loginDate = new Date(item.loginTime);
        const dayOfWeek = loginDate.getDay(); // 0: Sunday, 1: Monday, 2: Tuesday, etc.

        // Map the `dayOfWeek` (0=Sunday, 6=Saturday) to the correct index for Monday-Friday
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          // Assuming that the attendanceType is either "Login" or "Logout"
          if (item.attendanceType === 'Login') {
            loginCount[dayOfWeek - 1]++; // Increment the login count for the day
          } else if (item.attendanceType === 'Logout') {
            logoutCount[dayOfWeek - 1]++; // Increment the logout count for the day
          }
        }
      });

      // Update the chart data
      setAttendanceData(prev => ({
        ...prev,
        datasets: [
          { ...prev.datasets[0], data: loginCount },
          { ...prev.datasets[1], data: logoutCount },
        ],
      }));
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const day = attendanceData.labels[index];
      alert(`You clicked on ${day}'s bar.`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Weekly Attendance Overview</h2>
      <Bar
        data={attendanceData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Attendance Report',
            },
          },
          onClick: handleBarClick,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Logins/Logouts',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Day of Week',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default WeeklyAttendanceChart;
