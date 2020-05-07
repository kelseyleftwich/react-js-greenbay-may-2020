import React from 'react';

const STROKE = 1;

export default ({
  data,
  width,
  height,
  precision,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
}) => {
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

  const points = data
    .map((element) => {
      const x = (element.x / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(' ');

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width - padding;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const ratio = (index + 1) / numberOfHorizontalGuides;

      const yCoordinate = chartHeight - chartHeight * ratio + padding;

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke={'#ccc'}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      );
    });
  };

  const VerticalGuides = () => {
    const guideCount = numberOfVerticalGuides || data.length - 1;

    const startY = padding;
    const endY = height - padding;

    return new Array(guideCount).fill(0).map((_, index) => {
      const ratio = (index + 1) / guideCount;

      const xCoordinate = padding + ratio * (width - padding * 2);

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke="#ccc"
            strokeWidth=".5"
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XAxis />
      <YAxis />

      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />

      <polyline
        fill="none"
        stroke="#0074d9"
        strokeWidth={STROKE}
        points={points}
      />
    </svg>
  );
};
