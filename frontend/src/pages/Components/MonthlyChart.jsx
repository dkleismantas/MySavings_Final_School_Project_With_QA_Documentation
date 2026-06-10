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
  if (!data || data.length === 0) {
    return (
      <section className="card bg-base-100 p-4 shadow" aria-labelledby="monthly-chart-heading">
        <h2 id="monthly-chart-heading" className="mb-4 text-lg font-bold">
          Monthly deposits
        </h2>
        <p role="status" aria-live="polite" className="text-sm text-base-content">
          No deposit data available yet.
        </p>
      </section>
    );
  }

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Monthly deposits",
        data: data.map((item) => item.totalAmount),
        backgroundColor: "#1d4ed8",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <section className="card bg-base-100 p-4 shadow" aria-labelledby="monthly-chart-heading">
      <h2 id="monthly-chart-heading" className="mb-4 text-lg font-bold">
        Monthly deposits
      </h2>
      <p id="monthly-chart-description" className="sr-only">
        Bar chart of monthly deposited amounts.
      </p>

      <div className="h-64 sm:h-80">
        <Bar
          data={chartData}
          options={options}
          role="img"
          aria-label="Monthly deposits bar chart"
          aria-describedby="monthly-chart-description"
        />
      </div>
    </section>
  );
};

export default MonthlyChart;
