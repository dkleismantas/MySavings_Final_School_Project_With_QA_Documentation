import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyChart = ({ data }) => {
  const chartData = {
    labels: data && data.length > 0 ? data.map((item) => item.month) : ["No data"],
    datasets: [
      {
        label: "Monthly deposits",
        data: data && data.length > 0 ? data.map((item) => item.totalAmount) : [0],
        backgroundColor: "#FF5722",
        hoverBackgroundColor: "#e44d1e",
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 'flex',
        maxBarWidth: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#18181b",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#27272a",
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#a1a1aa", font: { family: "Inter, sans-serif", size: 11 } }
      },
      y: {
        grid: { color: "rgba(39, 39, 42, 0.4)", drawTicks: false },
        ticks: { color: "#a1a1aa", font: { size: 11 } }
      }
    }
  };

  return (
    <section className="w-full bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-6 shadow-xl flex flex-col h-full min-h-[340px] lg:min-h-full" aria-labelledby="monthly-chart-heading">
      <div className="mb-6">
        <h2 id="monthly-chart-heading" className="text-sm font-medium text-gray-400 tracking-wide uppercase">
          Monthly deposits
        </h2>
      </div>

      <div className="relative flex-grow h-64 lg:h-full min-h-[240px]">
        {!data || data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500" role="status">
            No deposit data available yet.
          </div>
        ) : (
          <Bar data={chartData} options={options} aria-label="Monthly deposits bar chart" />
        )}
      </div>
    </section>
  );
};

export default MonthlyChart;