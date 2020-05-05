import React from 'react';

export default ({ data, width, height, precision }) => {
  const FONT_SIZE = width / 50;
  const maximumXFromData = Math.max(...data.map((e) => e.x));
  const maximumYFromData = Math.max(...data.map((e) => e.y));

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const Axis = ({ points }) => (
    <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
  );

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  );

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  );

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XAxis />
      <YAxis />
    </svg>
  );
};
