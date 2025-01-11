import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

function SalesOverviewChart({ Data }) {
    const [selectedStatus, setSelectedStatus] = useState('Present');
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    // Filter and format the data
    const salesData = Data.filter(data => data?._id?.status === selectedStatus && new Date(data?._id?.date) >= lastMonthDate)
        .map(data => ({
            date: new Date(data?._id?.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            count: data.count
        }));

    

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#D90A14]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between my-4">
                <h2 className="text-lg font-medium mb-4 text-gray-100">
                    Attendance Overview
                </h2>
                <select
                    name="selectStatus"
                    id="selectStatus"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="On Leave">On Leave</option>
                </select>
            </div>
            <div className="h-80">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray='3 3' stroke="#4B5563" />
                        <XAxis dataKey={"date"} stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#D90A14" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export default SalesOverviewChart;