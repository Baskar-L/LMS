import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#16A34A",
  "#EAB308",
];

const EnrollmentChart = ({
  completed = 0,
  inProgress = 0,
}) => {
  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "In Progress",
      value: inProgress,
    },
  ];

  return (
    <div className="card h-[350px]">
      <h3 className="text-lg font-semibold mb-4">
        Enrollment Status
      </h3>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map(
              (
                entry,
                index
              ) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnrollmentChart;