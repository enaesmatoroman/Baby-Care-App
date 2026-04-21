import WeatherWidget from "../../components/weather/WeatherWidget";
import StatsWidget from "../../components/stats/StatsWidget";
function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-[#FAFAFA]">
        <WeatherWidget />
        <StatsWidget />
    </div>
  )
}
export default Dashboard
