import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Monthly deposits",
        data: data.map((item) => item.totalAmount),
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="card bg-base-100 shadow p-4">
        <h2 className="text-lg font-bold mb-4">
            Monthly deposits
        </h2>

        <div className="h-80">
            <Bar data={chartData} options={options} />
        </div>
    </div>
  );
};

export default MonthlyChart;