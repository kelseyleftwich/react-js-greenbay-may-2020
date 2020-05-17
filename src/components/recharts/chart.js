import React from 'react';
import { LineChart, XAxis, Line, YAxis } from 'recharts';

const style = {
  fontFamily: 'sans-serif',
};

const CustomDot = (props) => {
  const { cx, cy, stroke, payload, value, target } = props;

  if (payload.x !== target) {
    return null;
  }

  const height = 50;
  const width = 125;

  const yOffset = 60;

  const invert = cy - height - yOffset < 0;

  const rectY = invert ? cy + yOffset : cy - (height + yOffset);
  const lineY = invert ? cy + yOffset : cy - (height + yOffset);

  return (
    <g>
      <line
        x1={cx}
        x2={cx}
        y1={lineY}
        y2={cy}
        strokeWidth={2}
        stroke={stroke}
      />
      <rect
        x={cx - width / 2}
        y={rectY}
        rx={5}
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth={1}
        fill={stroke}
      />
      <text
        x={cx}
        y={rectY}
        width={width}
        textAnchor="middle"
        fill="#fff"
        style={style}
        alignmentBaseline="middle"
      >
        <tspan x={cx} dy={20} fontSize={14}>
          You are here:
        </tspan>
        <tspan x={cx} dy={18}>
          {value} movements
        </tspan>
      </text>

      <circle r={5} cx={cx} cy={cy} fill={stroke} />
    </g>
  );
};

export default ({ data, target }) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 75, bottom: 5, left: 5 }}
    >
      <XAxis dataKey="label" />
      <YAxis />
      <Line
        type="linear"
        dataKey="y"
        stroke="#8884d8"
        dot={<CustomDot target={target} />}
        isAnimationActive={false}
      />
    </LineChart>
  );
};
