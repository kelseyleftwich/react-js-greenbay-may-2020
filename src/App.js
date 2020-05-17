import React, { useState } from 'react';
import LineChart from './components/LineChart';
import ChartTitle from './components/ChartTitle';
import Label from './components/AxisLabel';
import Chart from './components/recharts/chart';

const data = [
  { label: 'S', x: 0, y: 0 },
  { label: 'M', x: 1, y: 400 },
  { label: 'T', x: 2, y: 300 },
  { label: 'W', x: 3, y: 100 },
  { label: 'TH', x: 4, y: 400 },
  { label: 'F', x: 5, y: 500 },
  { label: 'S', x: 6, y: 400 },
];

const styles = {
  chartComponentsContainer: {
    display: 'grid',
    gridTemplateColumns: 'max-content 700px',
    alignItems: 'center',
    marginBottom: 48,
  },
  chartWrapper: { maxWidth: 700, alignSelf: 'flex-start' },
};

function App() {
  const [target, setTarget] = useState(3);

  const handleInputChange = ({ target: { value } }) => {
    const parsedValue = parseInt(value, 10);

    console.log(data.map(({ x }) => x));

    if (Number.isNaN(parsedValue)) {
      return;
    }

    const min = Math.min(...data.map(({ x }) => x));
    const max = Math.max(...data.map(({ x }) => x));

    console.log(min, max);

    if (parsedValue < min || parsedValue > max) {
      return;
    }

    setTarget(parsedValue);
  };

  return (
    <>
      <div style={styles.chartComponentsContainer}>
        <div />
        <ChartTitle text="Movements per Day of the Week" />
        <Label text="Movements" rotate />

        <div style={styles.chartWrapper}>
          <LineChart
            width={500}
            height={300}
            data={data}
            horizontalGuides={5}
            precision={2}
            verticalGuides={data.length - 1}
          />
        </div>
        <div />
        <Label text="Days of the Week" />
      </div>
      <hr />
      <Chart data={data} target={target} />

      <input
        type="number"
        value={target}
        onChange={handleInputChange}
        placeholder="target"
      />
    </>
  );
}

export default App;
