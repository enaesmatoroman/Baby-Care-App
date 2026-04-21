import { useEffect, useState } from "react";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "1700b4031e214261b92134717262104"; 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Bihać`
        );

        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.error("Weather error:", err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getBabyAdvice = (temp) => {
    if (temp < 10) return "🧥 Topla odjeća + kapa + dekica";
    if (temp < 20) return "🧶 Slojevita odjeća (majica + džemper)";
    return "👕 Lagana i prozračna odjeća";
  };

  if (loading) return <p>Loading weather...</p>;

  if (!weather || !weather.current) return <p>Weather unavailable</p>;

  const temp = weather.current.temp_c;

  return (
    <div className="bg-blue-100 p-4 rounded-xl shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-2">🌤 Weather Today</h2>

      <p className="text-lg">
        📍 {weather.location.name}
      </p>

      <p className="text-3xl font-bold">
        {temp}°C
      </p>

      <p className="capitalize">
        {weather.current.condition.text}
      </p>

      <div className="mt-3 p-3 bg-white rounded-lg">
        <p className="font-semibold">👶 Baby care advice:</p>
        <p>{getBabyAdvice(temp)}</p>
      </div>
    </div>
  );
}

export default WeatherWidget;