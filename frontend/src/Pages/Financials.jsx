import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Financials() {
  const [salesTotal, setSalesTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [netEarningsTotal, setNetEarningsTotal] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [percentageData, setPercentageData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:3000/netEarnings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { totalEarnings, totalExpenses, netIncome, sales, expenses } =
          response.data;

        setSalesTotal(totalEarnings);
        setExpensesTotal(totalExpenses);
        setNetEarningsTotal(netIncome);

        const data = sales.map((sale, index) => ({
          date: new Date(sale.saleDate).toLocaleDateString(),
          sales: sale.totalPrice,
          expenses: expenses[index] ? expenses[index].amount : 0,
          netEarnings:
            sale.totalPrice - (expenses[index] ? expenses[index].amount : 0),
        }));

        setChartData(data);

        // Calculate percentage differences
        const weeklyDifference = calculatePercentageDifference(data, "week");
        const monthlyDifference = calculatePercentageDifference(data, "month");
        const yearlyDifference = calculatePercentageDifference(data, "year");

        setPercentageData({
          weekly: weeklyDifference !== null ? weeklyDifference : "N/A",
          monthly: monthlyDifference != null ? monthlyDifference : "N/A",
          yearly: yearlyDifference !== null ? yearlyDifference : "N/A",
        });
      })
      .catch((error) => console.error("Error fetching financial data:", error));
  }, []);

  const calculatePercentageDifference = (data, timeframe) => {
    const currentDate = new Date();
    let pastDate = new Date();

    switch (timeframe) {
      case "week":
        pastDate.setDate(currentDate.getDate() - 7);
        break;
      case "month":
        pastDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "year":
        pastDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      default:
        return 0;
    }

    const salesCurrentPeriod = data.filter(
      (entry) =>
        new Date(entry.date) > pastDate && new Date(entry.date) <= currentDate
    );
    const salesPastPeriod = data.filter(
      (entry) => new Date(entry.date) <= pastDate
    );

    const salesCurrentPeriodTotal = salesCurrentPeriod.reduce(
      (total, entry) => total + entry.sales,
      0
    );
    const salesPastPeriodTotal = salesPastPeriod.reduce(
      (total, entry) => total + entry.sales,
      0
    );

    const percentageDifference =
      ((salesCurrentPeriodTotal - salesPastPeriodTotal) /
        salesPastPeriodTotal) *
      100;

    return percentageDifference.toFixed(2);
  };

  return (
    <div className="p-6 bg-green-50">
      <h2 className="text-2xl font-bold text-green-700">Financials</h2>
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-green-800">
          Total Sales: <span className="font-normal">{salesTotal}</span>
        </p>
        <p className="text-lg font-semibold text-green-800">
          Total Expenses: <span className="font-normal">{expensesTotal}</span>
        </p>
        <p className="text-lg font-semibold text-green-800">
          Total Net Earnings: <span className="font-normal">{netEarningsTotal}</span>
        </p>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2c7a7b"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="expenses" stroke="#c53030" />
            <Line type="monotone" dataKey="netEarnings" stroke="#2f855a" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-green-700">Percentage Differences</h3>
        <table className="table-auto mt-4 w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-green-800">Timeframe</th>
              <th className="px-4 py-2 text-left text-green-800">Percentage Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-green-700">Weekly</td>
              <td className="border px-4 py-2 text-green-700">{percentageData.weekly}%</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-green-700">Monthly</td>
              <td className="border px-4 py-2 text-green-700">{percentageData.monthly}%</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-green-700">Yearly</td>
              <td className="border px-4 py-2 text-green-700">{percentageData.yearly}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
