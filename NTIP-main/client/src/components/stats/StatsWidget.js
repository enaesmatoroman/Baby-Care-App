import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function StatsWidget() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("http://localhost:3001/api/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;
  const formatWeeklyData = (data) => {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  
    return days.map((day, index) => {
      const found = data.find(d => d.day == index);
  
      return {
        day,
        feedings: found?.feedings || 0,
        sleep: found?.sleep || 0,
        symptoms: found?.symptoms || 0
      };
    });
  };
  const formatMonthlyData = (data = []) => {
    return data.map(d => ({
      week: "W" + d.week,
      feedings: d.feedings || 0,
      sleep: d.sleep || 0,
      symptoms: d.symptoms || 0
    }));
  };
  const weeklyData = formatWeeklyData(stats?.weeklyLogs || []);
  const monthlyData = formatMonthlyData(stats.monthlyLogs || []);
  return (
    <div className="p-4 space-y-6">

      {/* DAILY */}
      <div className="bg-pink-100 p-4 rounded-xl shadow">
        <h2 className="font-bold">📅 Today</h2>
        <p>🍼 Feedings: {stats.dailyLogs?.feedings || 0}</p>
        <p>😴 Sleep: {stats.dailyLogs?.sleep || 0}</p>
        <p>🤒 Symptoms: {stats.dailyLogs?.symptoms || 0}</p>
      </div>

      {/* WEEKLY */}
      <div className="bg-blue-100 p-4 rounded-xl shadow">
        <h2 className="font-bold">📊 Weekly</h2>

        <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyData}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="feedings" fill="#8884d8" />
        <Bar dataKey="sleep" fill="#82ca9d" />
        <Bar dataKey="symptoms" fill="#ff6b6b" />
        </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-2 text-sm">
  <div className="flex items-center gap-1">
    <div className="w-3 h-3 bg-[#8884d8]"></div>
    <span>Feedings</span>
  </div>

  <div className="flex items-center gap-1">
    <div className="w-3 h-3 bg-[#82ca9d]"></div>
    <span>Sleep</span>
  </div>

  <div className="flex items-center gap-1">
    <div className="w-3 h-3 bg-[#ff6b6b]"></div>
    <span>Symptoms</span>
  </div>
</div>
      {/* MONTHLY */}
      <div className="bg-yellow-100 p-4 rounded-xl shadow">
        <h2 className="font-bold">📈 Monthly</h2>

        <ResponsiveContainer width="100%" height={200}>
        <BarChart data={monthlyData}>
  <XAxis dataKey="week" />
  <YAxis />
  <Tooltip />

  <Bar dataKey="feedings" fill="#8884d8" />
  <Bar dataKey="sleep" fill="#82ca9d" />
  <Bar dataKey="symptoms" fill="#ff6b6b" />
</BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default StatsWidget;