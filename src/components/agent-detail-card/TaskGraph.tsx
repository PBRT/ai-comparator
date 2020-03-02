import React from "react";
import { Colors } from "@blueprintjs/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer
} from "recharts";

import { Category, Task } from "../../api/agents.types";
import { useWindowSize } from "../../utils/useWindowSize";
import { statistics } from "../../utils/statistics";

type GraphData = {
  name: Category;
  values: {
    [key: string]: number;
  };
};

// Process the data to compute the statistics
// and put it into a valid shape for the diagram librairy
function processData(
  shardedTasks: Map<Category, Map<string, Task>>
): Array<GraphData> {
  const keys = Array.from(shardedTasks.keys());
  const data = keys.map(key => {
    const tasks = shardedTasks.get(key);
    if (tasks === undefined) {
      return {
        name: key,
        values: {}
      };
    }
    const statisticsValues = statistics.reduce(
      (acc, stat) => ({
        ...acc,
        [stat.name]: stat.calculus(tasks)
      }),
      {}
    );
    return {
      name: key,
      values: statisticsValues
    };
  });

  return data;
}

// Remove the values. in front of each legends
// Fallback on default legend
function formatLegend(value: string) {
  const regex = value.match(/values\.(.*)/);
  return regex !== null ? regex[1] : value;
}

type Props = {
  shardedTasks: Map<Category, Map<string, Task>>;
};

function TaskGraph({ shardedTasks }: Props) {
  const { innerWidth } = useWindowSize();
  const isTabletOrLower = innerWidth != null && innerWidth < 768;
  const containerWidth = isTabletOrLower ? "100%" : "50%";
  const processedData = processData(shardedTasks);
  return (
    <ResponsiveContainer width={containerWidth} height={300}>
      <BarChart
        width={500}
        height={300}
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="name" stroke={Colors.WHITE} />
        <YAxis stroke={Colors.WHITE} />
        <Legend formatter={formatLegend} />
        {statistics.map(({ name, color, id }) => (
          <Bar key={id} dataKey={`values.${name}`} fill={color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TaskGraph;
