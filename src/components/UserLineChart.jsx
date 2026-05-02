import { useEffect, useState } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const UserLineChart = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/users/analytics/growth")
  //     .then(res => res.json())
  //     .then(result => {
  //       const formatted = result.map(item => ({
  //         ...item,
  //         date: new Date(item.date).toLocaleDateString("en-US", {
  //           month: "short",
  //           day: "numeric"
  //         })
  //       }));

  //       setData(formatted);
  //     });
  // }, []);
   
  // for testing users
  useEffect(() => {
  const testData = [
    { date: "Jan 1", users: 10 },
    { date: "Jan 2", users: 20 },
    { date: "Jan 3", users: 15 },
    { date: "Jan 4", users: 3000 },
    { date: "Jan 5", users: 25 },
    { date: "Jan 6", users: 5000 },
    { date: "Jan 7", users: 35 },
     { date: "Feb 7", users: 1000 },
  ];

  setData(testData);
}, []);

  return (
<div className="mt-5 w-1/2 rounded-2xl border border-blue-400/20 bg-white/60 dark:bg-blue-400/5 backdrop-blur-xl shadow-sm transition-all duration-300 p-6">
  
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
      User Growth
    </h2>

    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-300">
      Live Data
    </span>
  </div>

  <ResponsiveContainer width="100%" height={300}>
    <ReLineChart data={data}>
      <defs>
        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
      <XAxis dataKey="date" stroke="#9ca3af" />
      <YAxis stroke="#9ca3af" />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="users"
        stroke="#3b82f6"
        strokeWidth={2}
        dot={{ r: 3 }}
        activeDot={{ r: 6 }}
        fill="url(#colorUsers)"
      />
    </ReLineChart>
  </ResponsiveContainer>
</div>
  );
};

export default UserLineChart;